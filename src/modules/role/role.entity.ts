/* eslint-disable prettier/prettier */
import { Index } from "typeorm";
import { EntityRepositoryType } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { MultiORMColumn, MultiORMEntity, MultiORMOneToMany } from "../../core/decorators/entity";
import { TenantBaseEntity } from "../../core/entities/tenant-base.entity";
import { MikroOrmRoleRepository } from "./repository/mikro-orm-role.repository";
import { RolePermission } from "../role-permission/role-permission.entity";

@MultiORMEntity('role', { mikroOrmRepository: () => MikroOrmRoleRepository })
@SoftDeletable(() => Role, "deletedAt", () => new Date())
export class Role extends TenantBaseEntity {

	// to allow inference in `em.getRepository()`
	[EntityRepositoryType]?: MikroOrmRoleRepository;

	@Index()
	@MultiORMColumn()
	name: string;

	@MultiORMColumn({ default: false })
	isSystem: boolean;

	/**
	 * Role Permissions
	 */
	@MultiORMOneToMany(() => RolePermission, (it) => it.role, {
		cascade: true
	})
	rolePermissions?: RolePermission[];
}
