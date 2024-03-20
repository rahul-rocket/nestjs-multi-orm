/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { Module } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { coreEntities, coreSubscribers } from './core/entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5433,
            database: process.env.DB_NAME || 'postgres',
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || 'root',
            synchronize: process.env.DB_SYNCHRONIZE === 'true', // We are using migrations, synchronize should be set to false.
            uuidExtension: 'pgcrypto',
            entities: coreEntities,
            subscribers: coreSubscribers
        }),
        MikroOrmModule.forRoot({
            dbName: process.env.DB_NAME,
            driver: PostgreSqlDriver,
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5433,
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || 'root',
            entities: coreEntities,
            subscribers: coreSubscribers,
            persistOnCreate: true,
            namingStrategy: EntityCaseNamingStrategy,
            debug: ['query']
        }),
    ],
    providers: [],
    exports: [],
})
export class DatabaseModule { }