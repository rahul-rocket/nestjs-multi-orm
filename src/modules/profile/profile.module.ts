/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Profile } from './profile.entity';
import { TypeOrmProfileRepository } from './repository/type-orm-profile.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile]),
        MikroOrmModule.forFeature([Profile]),
    ],
    controllers: [],
    providers: [TypeOrmProfileRepository],
    exports: [TypeOrmModule, MikroOrmModule]
})
export class ProfileModule { }
