/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile.entity';

export class TypeOrmProfileRepository extends Repository<Profile> {
    constructor(
        @InjectRepository(Profile) readonly repository: Repository<Profile>
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
