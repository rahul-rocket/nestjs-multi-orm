/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';
import { EntityManager } from '@mikro-orm/core';
import { CrudService } from '../../core/crud/crud.service';
import { IFindManyOptions, IPartialEntity } from '../../core/crud/icrud';
import { TypeOrmUserRepository } from './repository/type-orm-user.repository';
import { MikroOrmUserRepository } from './repository/mikro-orm-user.repository';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';

@Injectable()
export class UserService extends CrudService<User> {
    constructor(
        readonly typeOrmUserRepository: TypeOrmUserRepository,
        readonly mikroOrmUserRepository: MikroOrmUserRepository,
        private readonly em: EntityManager
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
                        employee: {
                            id: IsNull()
                        }
                    },
                    {
                        email,
                        isActive: true,
                        isArchived: false,
                        hash: Not(IsNull()),
                        employee: {
                            isActive: true, // If employees are inactive
                            isArchived: false
                        }
                    }
                ],
                relations: {
                    employee: true,
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
}
