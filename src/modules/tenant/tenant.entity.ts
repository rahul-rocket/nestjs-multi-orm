/* eslint-disable prettier/prettier */

import { Index } from "typeorm";
import { EntityRepositoryType } from "@mikro-orm/core";
import { MultiORMColumn, MultiORMEntity, MultiORMOneToMany } from "../../core/decorators/entity";
import { MikroOrmTenantRepository } from "./repository/mikro-orm-tenant.repository";
import { RolePermission } from "../role-permission/role-permission.entity";
import { BaseEntity } from "../../core/entities/base.entity";


@MultiORMEntity('tenant', { mikroOrmRepository: () => MikroOrmTenantRepository })
export class Tenant extends BaseEntity {

	// to allow inference in `em.getRepository()`
	[EntityRepositoryType]?: MikroOrmTenantRepository;

	@Index()
	@MultiORMColumn()
	name?: string;

	@MultiORMColumn({ nullable: true })
	logo?: string;

	/*
	|--------------------------------------------------------------------------
	| @OneToMany
	|--------------------------------------------------------------------------
	*/
	// @MultiORMOneToMany(() => RolePermission, (it) => it.tenant, {
	// 	cascade: true
	// })
	// rolePermissions?: RolePermission[];
}
