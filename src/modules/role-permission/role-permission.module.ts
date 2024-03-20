/* eslint-disable prettier/prettier */
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RolePermission } from './role-permission.entity';
import { RolePermissionController } from './role-permission.controller';
import { TypeOrmRolePermissionRepository } from './repository/type-orm-role-permission.repository';
import { RolePermissionService } from './role-permission.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RolePermission]),
        MikroOrmModule.forFeature([RolePermission]),
    ],
    controllers: [RolePermissionController],
    providers: [
        RolePermissionService,
        TypeOrmRolePermissionRepository
    ],
    exports: [
        TypeOrmModule,
        MikroOrmModule
    ]
})
export class RolePermissionModule { }
