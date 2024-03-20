/* eslint-disable prettier/prettier */
import { MikroOrmBaseEntityRepository } from '../../../core/repository/mikro-orm-base-entity.repository';
import { User } from '../user.entity';

export class MikroOrmUserRepository extends MikroOrmBaseEntityRepository<User> { }
