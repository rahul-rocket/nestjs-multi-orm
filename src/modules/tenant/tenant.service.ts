/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MikroOrmTenantRepository, TypeOrmTenantRepository } from './repository';
import { CrudService } from '../../core/crud/crud.service';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService extends CrudService<Tenant> {

    constructor(
        readonly typeOrmTenantRepository: TypeOrmTenantRepository,
        readonly mikroOrmTenantRepository: MikroOrmTenantRepository,
    ) {
        super(typeOrmTenantRepository, mikroOrmTenantRepository);
    }

    /**
     * 
     */
    async findAll() {
        return await super.findAll();
    }
}
