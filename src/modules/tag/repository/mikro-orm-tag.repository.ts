/* eslint-disable prettier/prettier */
import { MikroOrmBaseEntityRepository } from '../../../core/repository/mikro-orm-base-entity.repository';
import { Tag } from '../tag.entity';

export class MikroOrmTagRepository extends MikroOrmBaseEntityRepository<Tag> { }
