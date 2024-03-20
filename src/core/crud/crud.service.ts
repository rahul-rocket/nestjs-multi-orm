/* eslint-disable prettier/prettier */
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// Original license: MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Original copyright: Copyright (c) 2018 Sumanth Chinthagunta

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AssignOptions, CreateOptions, EntityRepository, RequiredEntityData, UpsertOptions, wrap } from '@mikro-orm/knex';
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
		protected readonly mikroOrmRepository: EntityRepository<T>
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
		entity: IPartialEntity<T>,
		createOptions: CreateOptions = {
			/** Creates a managed entity instance instead, bypassing the constructor call */
			managed: true
		},
		upsertOptions: UpsertOptions<T> = {
			onConflictFields: ['id'], // specify a manual set of fields pass to the on conflict clause
			onConflictExcludeFields: ['createdAt'],
		},
		assignOptions: AssignOptions = {
			updateNestedEntities: false,
			mergeObjectProperties: true,
			onlyProperties: true
		}
	): Promise<T> {
		try {
			switch (this.ormType) {
				case MultiORMEnum.MikroORM:
					try {
						// Returns the name of the entity associated with this repository.
						const entityName = this.mikroOrmRepository.getEntityName();

						// Returns the underlying EntityManager instance from the repository.
						const em = this.mikroOrmRepository.getEntityManager();

						// Create a new entity using MikroORM
						const newEntity = em.create(entityName, entity as RequiredEntityData<T>, createOptions);
						// If the entity doesn't have an ID, it's new and should be persisted
						if (!entity['id']) {
							// Persisting the entities
							await em.persistAndFlush(newEntity); // This will also persist the relations
							return this.serialize(newEntity);
						}

						console.log(upsertOptions);
						// If the entity has an ID, perform an upsert operation
						// This block will only be reached if the entity is existing
						const upsertedEntity = await em.upsert(entityName, newEntity, upsertOptions);
						console.log({ upsertedEntity });
						return this.serialize(upsertedEntity);
					} catch (error) {
						console.error('Error during transaction:', error);
					}
				case MultiORMEnum.TypeORM:
					const newEntity = this.typeOrmRepository.create(entity as DeepPartial<T>);
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
		return entity;
	}
}
