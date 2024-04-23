/* eslint-disable prettier/prettier */
import { JoinColumn, RelationId, Index, JoinTable } from 'typeorm';
import { EntityRepositoryType } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { SoftDeletable } from 'mikro-orm-soft-delete';
import { EmbeddedColumn, MultiORMColumn, MultiORMEntity, MultiORMManyToOne } from '../../core/decorators/entity';
import { BaseEntity } from "../../core/entities/base.entity";
import { Role, Tag } from '../../core/entities/internal';
import { CustomFields } from '../../core/entities/custom-entity-fields';
import { MikroOrmUserRepository } from './repository/mikro-orm-user.repository';
import { TypeOrmManyToMany } from 'src/core/decorators/entity/relations/type-orm';
import { MikroOrmManyToMany } from 'src/core/decorators/entity/relations/mikro-orm';

@MultiORMEntity('user', { mikroOrmRepository: () => MikroOrmUserRepository })
@SoftDeletable(() => User, "deletedAt", () => new Date())
export class User extends BaseEntity {

	// to allow inference in `em.getRepository()`
	[EntityRepositoryType]?: MikroOrmUserRepository;

	@MultiORMColumn({ nullable: true })
	thirdPartyId?: string;

	@MultiORMColumn({ nullable: true })
	firstName?: string;

	@MultiORMColumn({ nullable: true })
	lastName?: string;

	@MultiORMColumn({ nullable: true })
	email?: string;

	@Exclude({ toPlainOnly: true })
	@MultiORMColumn({ nullable: true })
	hash?: string;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/
	@MultiORMManyToOne(() => Role, {
		/** Indicates if relation column value can be nullable or not. */
		nullable: true,

		/** Database cascade action on delete. */
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	role?: Role;

	/**
	 * 
	 */
	@RelationId((it: User) => it.role)
	@Index()
	@MultiORMColumn({ nullable: true, relationId: true })
	roleId?: string;

	// /*
	// |--------------------------------------------------------------------------
	// | @ManyToMany
	// |--------------------------------------------------------------------------
	// */
	// @TypeOrmManyToMany(() => Tag)
	// @JoinTable({ name: 'tag_user' })
	// @MikroOrmManyToMany({
	// 	entity: () => Tag,
	// 	pivotTable: 'tag_user',
	// 	joinColumn: 'userId',
	// 	inverseJoinColumn: 'tagId'
	// })
	// tags?: Tag[];

	/*
	|--------------------------------------------------------------------------
	| Embeddable Columns
	|--------------------------------------------------------------------------
	*/
	@EmbeddedColumn(() => CustomFields, { prefix: false })
	customFields?: CustomFields;
}
