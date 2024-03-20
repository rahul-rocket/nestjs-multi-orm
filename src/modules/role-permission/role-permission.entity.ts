/* eslint-disable prettier/prettier */
import { Index, RelationId } from 'typeorm';
import { EntityRepositoryType } from '@mikro-orm/core';
import { Role } from '../../core/entities/internal';
import { MultiORMColumn, MultiORMEntity } from '../../core/decorators/entity';
import { MultiORMManyToOne } from '../../core/decorators/entity/relations';
import { TenantBaseEntity } from '../../core/entities/tenant-base.entity';
import { MikroOrmRolePermissionRepository } from './repository/mikro-orm-role-permission.repository';

@MultiORMEntity('role_permission', { mikroOrmRepository: () => MikroOrmRolePermissionRepository })
export class RolePermission extends TenantBaseEntity {

	// to allow inference in `em.getRepository()`
	[EntityRepositoryType]?: MikroOrmRolePermissionRepository;

	@Index()
	@MultiORMColumn()
	permission: string;

	@MultiORMColumn({ nullable: true, default: false })
	enabled: boolean;

	@MultiORMColumn({ nullable: true })
	description: string;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/
	@MultiORMManyToOne(() => Role, (it) => it.rolePermissions, {
		onDelete: 'CASCADE'
	})
	role: Role;

	@RelationId((it: RolePermission) => it.role)
	@Index()
	@MultiORMColumn({ relationId: true })
	roleId: string;
}
