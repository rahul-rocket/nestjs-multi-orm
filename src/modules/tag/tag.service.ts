/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../core/crud/crud.service';
import { IFindManyOptions } from '../../core/crud/icrud';
import { TypeOrmTagRepository } from './repository/type-orm-tag.repository';
import { MikroOrmTagRepository } from './repository/mikro-orm-tag.repository';
import { Tag } from './tag.entity';

@Injectable()
export class TagService extends CrudService<Tag> {
    constructor(
        readonly typeOrmUserRepository: TypeOrmTagRepository,
        readonly mikroOrmUserRepository: MikroOrmTagRepository
    ) {
        super(typeOrmUserRepository, mikroOrmUserRepository);
    }

    /**
     * 
     * @param options 
     * @returns 
     */
    public async findAll(options?: IFindManyOptions<Tag>) {
        return await super.findAll(options);
    }
}
