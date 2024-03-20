/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantController {

    constructor(
        readonly _tenantService: TenantService
    ) { }

    @Get()
    async findAll() {
        return await this._tenantService.findAll();
    }
}
