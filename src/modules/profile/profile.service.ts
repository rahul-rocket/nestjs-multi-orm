/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { CrudService, MultiORMEnum } from "../../core/crud/crud.service";
import { IFindManyOptions } from "../../core/crud/icrud";
import { MikroOrmProfileRepository, TypeOrmProfileRepository } from "./repository";
import { Profile } from "./profile.entity";

@Injectable()
export class ProfileService extends CrudService<Profile> {
    constructor(
        readonly typeOrmProfileRepository: TypeOrmProfileRepository,
        readonly mikroOrmProfileRepository: MikroOrmProfileRepository,
    ) {
        super(typeOrmProfileRepository, mikroOrmProfileRepository);
    }

    /**
     * 
     * @returns 
     */
    public async findAllByCreateQueryBuilder(options?: IFindManyOptions<Profile>): Promise<{ items: Profile[]; total: number; }> {
        const { tenantId } = options.where as any;
        switch (this.ormType) {
            case MultiORMEnum.MikroORM:
                try {
                    const mikroQuery = this.mikroOrmProfileRepository.createQueryBuilder('Profile');
                    mikroQuery.andWhere(`"${mikroQuery.alias}"."tenantId" = ?`, [tenantId]);
                    const [items, total] = await mikroQuery.getResultAndCount();
                    return { items, total };
                } catch (error) {
                    console.log(`Error while getting profiles by ${MultiORMEnum.MikroORM}`, error);
                }
                break;
            case MultiORMEnum.TypeORM:
                try {
                    const query = this.typeOrmProfileRepository.createQueryBuilder();
                    query.andWhere(`"${query.alias}"."tenantId" = :tenantId`, { tenantId });
                    const [items, total] = await query.getManyAndCount();
                    return { items, total };
                } catch (error) {
                    console.log(`Error while getting profiles by ${MultiORMEnum.TypeORM}`, error);
                }
                break;
            default:
                throw new Error(`Not implemented for ${this.ormType}`);

        }
    }

    /**
     * 
     * @param options 
     * @returns 
     */
    public async findAll(options?: IFindManyOptions<Profile>): Promise<{ items: Profile[]; total: number; }> {
        return await super.findAll(options);
    }
}
