/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TypeOrmTagRepository } from './repository/type-orm-tag.repository';
import { Tag } from './tag.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tag]),
        MikroOrmModule.forFeature([Tag]),
    ],
    controllers: [TagController],
    providers: [TagService, TypeOrmTagRepository],
    exports: [TypeOrmModule, MikroOrmModule]
})
export class TagModule { }
