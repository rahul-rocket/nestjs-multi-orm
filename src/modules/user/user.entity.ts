/* eslint-disable prettier/prettier */
import { JoinColumn, RelationId, Index } from 'typeorm';
import { EntityRepositoryType } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { MultiORMColumn, MultiORMEntity, MultiORMManyToOne, MultiORMOneToOne } from '../../core/decorators/entity';
import { BaseEntity } from "../../core/entities/base.entity";
import { Profile, Role } from '../../core/entities/internal';
import { MikroOrmUserRepository } from './repository/mikro-orm-user.repository';

@MultiORMEntity('user', { mikroOrmRepository: () => MikroOrmUserRepository })
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

	@MultiORMManyToOne(() => Role, {
		/** Indicates if relation column value can be nullable or not. */
		nullable: true,

		/** Database cascade action on delete. */
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	role!: Role;

	/**
	 * 
	 */
	@RelationId((it: User) => it.role)
	@Index()
	@MultiORMColumn({ nullable: true, relationId: true })
	roleId?: string;

	/*
	|--------------------------------------------------------------------------
	| @OneToOne
	|--------------------------------------------------------------------------
	*/
	@MultiORMOneToOne(() => Profile, (profile) => profile.user, {
		/** If set to true then it means that related object can be allowed to be inserted or updated in the database. */
		cascade: true,
		/** Database cascade action on delete. */
		onDelete: 'SET NULL',
		/** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
		owner: true
	})
	@JoinColumn()
	profile?: Profile;
}
