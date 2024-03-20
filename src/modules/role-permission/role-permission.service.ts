/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../core/crud/crud.service';
import { TypeOrmRolePermissionRepository } from './repository/type-orm-role-permission.repository';
import { MikroOrmRolePermissionRepository } from './repository/mikro-orm-role-permission.repository';
import { RolePermission } from './role-permission.entity';

@Injectable()
export class RolePermissionService extends CrudService<RolePermission> {

    constructor(
        readonly typeOrmRolePermissionRepository: TypeOrmRolePermissionRepository,
        readonly mikroOrmRolePermissionRepository: MikroOrmRolePermissionRepository,
    ) {
        super(typeOrmRolePermissionRepository, mikroOrmRolePermissionRepository);
    }
}
