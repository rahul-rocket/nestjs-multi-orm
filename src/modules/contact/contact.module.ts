/* eslint-disable prettier/prettier */
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmContactRepository } from './repository/type-orm-contact.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Contact]),
        MikroOrmModule.forFeature([Contact]),
    ],
    controllers: [ContactController],
    providers: [ContactService, TypeOrmContactRepository],
    exports: [TypeOrmModule, MikroOrmModule, ContactService]
})
export class ContactModule { }
