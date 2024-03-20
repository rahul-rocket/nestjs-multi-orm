/* eslint-disable prettier/prettier */
import { CreateDateColumn, DeleteDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PrimaryKey, Property } from '@mikro-orm/core';
import { MultiORMColumn } from '../decorators/entity';

export abstract class Model {
	constructor(input?: any) {
		if (input) {
			for (const [key, value] of Object.entries(input)) {
				(this as any)[key] = value;
			}
		}
	}
}
export abstract class BaseEntity extends Model {

	@PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	// Date when the record was created
	@CreateDateColumn()
	@Property({
		// Automatically set the property value when entity gets created, executed during flush operation.
		onCreate: () => new Date()
	})
	createdAt?: Date = new Date();

	// Date when the record was last updated
	@UpdateDateColumn()
	@Property({
		// Automatically set the property value when entity gets created, executed during flush operation.
		onCreate: () => new Date(),
		// Automatically update the property value every time entity gets updated, executed during flush operation.
		onUpdate: () => new Date()
	})
	updatedAt?: Date = new Date();

	// Soft Delete
	@DeleteDateColumn()
	@Property({ nullable: true })
	deletedAt?: Date;

	// Indicates if record is active now
	@Index()
	@MultiORMColumn({ nullable: true, default: true })
	isActive?: boolean;

	@Index()
	@MultiORMColumn({ nullable: true, default: false })
	isArchived?: boolean;
}
