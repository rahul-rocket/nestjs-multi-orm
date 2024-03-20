/* eslint-disable prettier/prettier */
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { TypeOrmRoleRepository } from './repository/type-orm-role.repository';
import { RoleController } from './role.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
        MikroOrmModule.forFeature([Role]),
    ],
    controllers: [RoleController],
    providers: [RoleService, TypeOrmRoleRepository],
    exports: [TypeOrmModule, MikroOrmModule]
})
export class RoleModule { }
