/* eslint-disable prettier/prettier */
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmUserRepository } from './repository/type-orm-user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MikroOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [UserService, TypeOrmUserRepository],
    exports: [TypeOrmModule, MikroOrmModule]
})
export class UserModule { }
