/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';

export class TypeOrmTagRepository extends Repository<Tag> {

    constructor(
        @InjectRepository(Tag) readonly repository: Repository<Tag>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
