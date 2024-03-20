/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TypeOrmTenantRepository } from './repository/type-orm-tenant.repository';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { Tenant } from './tenant.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tenant]),
        MikroOrmModule.forFeature([Tenant]),
    ],
    controllers: [TenantController],
    providers: [
        TenantService,
        TypeOrmTenantRepository
    ],
    exports: [
        TypeOrmModule,
        MikroOrmModule
    ]
})
export class TenantModule { }
