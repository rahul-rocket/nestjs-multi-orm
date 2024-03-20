/* eslint-disable prettier/prettier */
import { JoinColumn, RelationId, Index } from 'typeorm';
import { Cascade, EntityRepositoryType } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { MultiORMColumn, MultiORMEntity, MultiORMManyToOne } from '../../core/decorators/entity';
import { MikroOrmOneToOne } from '../../core/decorators/entity/relations/mikro-orm';
import { TypeOrmOneToOne } from '../../core/decorators/entity/relations/type-orm';
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
	@TypeOrmOneToOne(() => Profile, (profile) => profile.user, {
		cascade: true,
		onDelete: 'SET NULL'
	})
	@MikroOrmOneToOne(() => Profile, (profile) => profile.user, {
		cascade: [Cascade.ALL],
		deleteRule: 'set null',
		owner: true,
		joinColumn: 'profileId'
	})
	@JoinColumn()
	profile?: Profile;
}
