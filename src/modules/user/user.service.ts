/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';
import { CrudService, MultiORMEnum } from '../../core/crud/crud.service';
import { IFindManyOptions, IPartialEntity } from '../../core/crud/icrud';
import { MikroOrmUserRepository, TypeOrmUserRepository } from './repository';
import { User } from './user.entity';

@Injectable()
export class UserService extends CrudService<User> {
    constructor(
        readonly typeOrmUserRepository: TypeOrmUserRepository,
        readonly mikroOrmUserRepository: MikroOrmUserRepository
    ) {
        super(typeOrmUserRepository, mikroOrmUserRepository);
    }

    /**
     * 
     * @param options 
     * @returns 
     */
    public async findAll(options?: IFindManyOptions<User>) {
        return await super.findAll(options);
    }

    /**
     * 
     * @param entity 
     * @returns 
     */
    public async create(entity: IPartialEntity<User>) {
        try {
            return await super.create(entity);
        } catch (error) {
            console.error('Error during transaction:', error);
        }
    }

    /**
     * User Login Request
     *
     * @param email
     * @param password
     * @returns
     */
    async login({ email }: any) {
        try {
            const user = await this.findOneByOptions({
                where: [
                    {
                        email,
                        isActive: true,
                        isArchived: false,
                        hash: Not(IsNull()),
                        profile: {
                            id: IsNull()
                        }
                    },
                    {
                        email,
                        isActive: true,
                        isArchived: false,
                        hash: Not(IsNull()),
                        profile: {
                            isActive: true, // If employees are inactive
                            isArchived: false
                        }
                    }
                ],
                relations: {
                    profile: true,
                    role: true
                },
                order: {
                    createdAt: 'DESC'
                }
            });
            console.log({ user });
        } catch (error) {
            console.log(error);
        }
    }

    /**
    * 
    */
    async delete(id: string) {
        try {
            switch (this.ormType) {
                case MultiORMEnum.MikroORM:
                    const entity = await this.mikroOrmUserRepository.findOne({ id });
                    const em = this.mikroOrmUserRepository.getEntityManager();
                    await em.removeAndFlush(entity);
                    return this.serialize(entity);
                case MultiORMEnum.TypeORM:
                    return await this.typeOrmUserRepository.delete(id);
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
        } catch (error) {
            console.log(error);
            throw new NotFoundException(`The record was not found`, error);
        }
    }
}
