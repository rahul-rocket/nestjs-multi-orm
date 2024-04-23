/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { Module } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { EntityCaseNamingStrategy, Utils } from '@mikro-orm/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SoftDeleteHandler } from 'mikro-orm-soft-delete';
import { coreEntities } from './../core/entities';
import { coreSubscribers } from './../core/entities/subscribers';
import { getLoggingMikroOptions, getLoggingOptions } from './database.helper';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5433,
            database: process.env.DB_NAME || 'postgres',
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || 'root',
            logging: getLoggingOptions(process.env.DB_LOGGING), // by default set to error only
            logger: 'advanced-console',
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
            migrations: {
                path: Utils.detectTsNode() ? 'src/database/migrations' : 'dist/database/migrations',
            },
            persistOnCreate: true,
            extensions: [SoftDeleteHandler],
            namingStrategy: EntityCaseNamingStrategy,
            debug: getLoggingMikroOptions(process.env.DB_LOGGING) // by default set to false only
        }),
    ],
    providers: [],
    exports: [],
})
export class DatabaseModule { }