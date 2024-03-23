/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Profile } from './profile.entity';
import { TypeOrmProfileRepository } from './repository/type-orm-profile.repository';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile]),
        MikroOrmModule.forFeature([Profile]),
    ],
    controllers: [ProfileController],
    providers: [ProfileService, TypeOrmProfileRepository],
    exports: [TypeOrmModule, MikroOrmModule, ProfileService, TypeOrmProfileRepository]
})
export class ProfileModule { }
