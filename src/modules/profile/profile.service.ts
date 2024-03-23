/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { CrudService } from "../../core/crud/crud.service";
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
    public async findAllByJoin(): Promise<{ items: Profile[]; total: number; }> {
        const query = this.typeOrmRepository.createQueryBuilder();
        query.innerJoinAndSelect(`${query.alias}.user`, 'user');
        query.innerJoinAndSelect(`user.role`, 'role');
        const [items, total] = await query.getManyAndCount();
        return { items, total };
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
