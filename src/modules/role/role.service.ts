/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService, MultiORMEnum } from '../../core/crud/crud.service';
import { IFindManyOptions } from '../../core/crud/icrud';
import { TypeOrmRoleRepository } from './repository/type-orm-role.repository';
import { MikroOrmRoleRepository } from './repository/mikro-orm-role.repository';
import { Role } from './role.entity';

@Injectable()
export class RoleService extends CrudService<Role> {
    constructor(
        readonly typeOrmRoleRepository: TypeOrmRoleRepository,
        readonly mikroOrmRoleRepository: MikroOrmRoleRepository,
    ) {
        super(typeOrmRoleRepository, mikroOrmRoleRepository);
    }

    /**
     * 
     */
    async findAll(options?: IFindManyOptions<Role>) {
        return await super.findAll(options);
    }

    /**
     * 
     */
    async delete(id: string) {
        try {
            switch (this.ormType) {
                case MultiORMEnum.MikroORM:
                    const entity = await this.mikroOrmRoleRepository.findOne({ id });
                    const em = this.mikroOrmRoleRepository.getEntityManager();
                    await em.removeAndFlush(entity);
                    return this.serialize(entity);
                case MultiORMEnum.TypeORM:
                    return await this.typeOrmRoleRepository.delete(id);
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
        } catch (error) {
            console.log(error);
            throw new NotFoundException(`The record was not found`, error);
        }
    }
}
