/* eslint-disable prettier/prettier */
import { MikroOrmBaseEntityRepository } from '../../../core/repository/mikro-orm-base-entity.repository';
import { Profile } from '../profile.entity';

export class MikroOrmProfileRepository extends MikroOrmBaseEntityRepository<Profile> { }
