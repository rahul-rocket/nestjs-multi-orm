/* eslint-disable prettier/prettier */
import { Delete, Param, Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {

    constructor(
        readonly _roleService: RoleService
    ) { }

    /**
     * 
     * @returns 
     */
    @Get()
    async findAll() {
        return await this._roleService.findAll();
    }

    /**
     * 
     * @param entity 
     * @returns 
     */
    @Post()
    async create(@Body() entity: Role) {
        return await this._roleService.create(entity);
    }

    // Delete by ID
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this._roleService.delete(id);
    }

    // Remove using an entity instance
    @Delete('remove/:id')
    async remove(@Param('id') id: string): Promise<void> {
        console.log(id);
    }
}
