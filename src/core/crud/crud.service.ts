/* eslint-disable prettier/prettier */
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// Original license: MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Original copyright: Copyright (c) 2018 Sumanth Chinthagunta

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AssignOptions, CreateOptions, RequiredEntityData, wrap } from '@mikro-orm/knex';
import { MikroOrmBaseEntityRepository } from '../repository/mikro-orm-base-entity.repository';
import { BaseEntity } from '../entities/base.entity';
import { parseTypeORMFindToMikroOrm } from './crud.helper';
import { IFindManyOptions, IPartialEntity } from './icrud';

/**
 * Enum representing different ORM types.
 */
export enum MultiORMEnum {
	TypeORM = 'typeorm',
	MikroORM = 'mikro-orm'
}

export abstract class CrudService<T extends BaseEntity> {
	constructor(
		protected readonly typeOrmRepository: Repository<T>,
		protected readonly mikroOrmRepository: MikroOrmBaseEntityRepository<T>,
	) { }

	/**
	 * Get the table name from the repository metadata.
	 * @returns {string} The table name.
	 */
	protected get tableName(): string {
		return this.typeOrmRepository.metadata.tableName;
	}

	/**
	 * Get the ORM type.
	 * @returns {MultiORM} The ORM type.
	 */
	protected get ormType(): string {
		return process.env.DB_ORM;
	}

	/**
	 * 
	 * @returns 
	 */
	public async findAll(options?: IFindManyOptions<T>) {
		let total: number;
		let items: T[];

		switch (this.ormType) {
			case MultiORMEnum.MikroORM:
				const { where, mikroOptions } = parseTypeORMFindToMikroOrm<T>(options as FindManyOptions);
				[items, total] = await this.mikroOrmRepository.findAndCount(where, mikroOptions) as any;
				items = items.map((entity: T) => this.serialize(entity)) as T[];
				break;
			case MultiORMEnum.TypeORM:
				[items, total] = await this.typeOrmRepository.findAndCount(options as FindManyOptions<T>);
				items = items.map((entity: T) => this.serialize(entity)) as T[];
				break;
			default:
				throw new Error(`Not implemented for ${this.ormType}`);
		}
		return { items, total };
	}

	/**
	 * Finds first entity by a given find options.
	 * If entity was not found in the database - returns null.
	 *
	 * @param options
	 * @returns
	 */
	public async findOneByOptions(options: any): Promise<T | null> {
		let record: T;
		switch (this.ormType) {
			case MultiORMEnum.MikroORM:
				const { where, mikroOptions } = parseTypeORMFindToMikroOrm<T>(options);
				record = await this.mikroOrmRepository.findOne(where, mikroOptions) as any;
				break;
			case MultiORMEnum.TypeORM:
				record = await this.typeOrmRepository.findOne(options as FindOneOptions<T>);
				break;
			default:
				throw new Error(`Not implemented for ${this.ormType}`);
		}

		if (!record) {
			throw new NotFoundException(`The requested record was not found`);
		}

		return this.serialize(record);
	}

	/**
	 * Creates a new entity or updates an existing one based on the provided entity data.
	 *
	 * @param entity The partial entity data for creation or update.
	 * @param createOptions Options for the creation of the entity in MikroORM.
	 * @param upsertOptions Options for the upsert operation in MikroORM.
	 * @returns The created or updated entity.
	 */
	public async create(
		partialEntity: IPartialEntity<T>,
		createOptions: CreateOptions<boolean> = {
			/** This option disables the strict typing which requires all mandatory properties to have value, it has no effect on runtime */
			partial: true,
			/** Creates a managed entity instance instead, bypassing the constructor call */
			managed: true
		},
		assignOptions: AssignOptions<boolean> = {
			updateNestedEntities: false,
			onlyOwnProperties: true
		}
	): Promise<T> {
		try {
			switch (this.ormType) {
				case MultiORMEnum.MikroORM:
					try {
						if (partialEntity['id']) {
							// Try to load the existing entity
							const entity = await this.mikroOrmRepository.findOne(partialEntity['id']);
							if (entity) {
								// If the entity has an ID, perform an upsert operation
								this.mikroOrmRepository.assign(entity, partialEntity as any, assignOptions);
								await this.mikroOrmRepository.flush();

								return this.serialize(entity);
							}
						}
						// If the entity doesn't have an ID, it's new and should be persisted
						// Create a new entity using MikroORM
						const newEntity = this.mikroOrmRepository.create(partialEntity as RequiredEntityData<T>, createOptions);

						// Persist new entity and flush
						await this.mikroOrmRepository.persistAndFlush(newEntity); // This will also persist the relations
						return this.serialize(newEntity);
					} catch (error) {
						console.error('Error during mikro orm create crud transaction:', error);
					}
				case MultiORMEnum.TypeORM:
					const newEntity = this.typeOrmRepository.create(partialEntity as DeepPartial<T>);
					return await this.typeOrmRepository.save(newEntity);
				default:
					throw new Error(`Not implemented for ${this.ormType}`);
			}
		} catch (error) {
			console.error('Error in crud service create method:', error);
			throw new BadRequestException(error);
		}
	}

	/**
	 * Serializes the provided entity based on the ORM type.
	 * @param entity The entity to be serialized.
	 * @returns The serialized entity.
	 */
	protected serialize(entity: T): T {
		if (this.ormType === MultiORMEnum.MikroORM) {
			// If using MikroORM, use wrap(entity).toJSON() for serialization
			return wrap(entity).toJSON() as T;
		}

		// If using other ORM types, return the entity as is
		return JSON.parse(JSON.stringify(entity));
	}
}
