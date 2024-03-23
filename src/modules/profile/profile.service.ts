/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { CrudService } from "../../core/crud/crud.service";
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
    public async findAll(): Promise<{ items: Profile[]; total: number; }> {
        const query = this.typeOrmRepository.createQueryBuilder();
        query.innerJoinAndSelect(`${query.alias}.user`, 'user');
        const [items, total] = await query.getManyAndCount();
        return { items, total };
    }
}
