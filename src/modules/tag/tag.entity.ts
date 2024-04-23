/* eslint-disable prettier/prettier */
import { JoinTable } from 'typeorm';
import { EntityRepositoryType } from '@mikro-orm/core';
import { MikroOrmManyToMany } from '../../core/decorators/entity/relations/mikro-orm';
import { TypeOrmManyToMany } from '../../core/decorators/entity/relations/type-orm';
import { MultiORMColumn, MultiORMEntity } from '../../core/decorators/entity';
import { TenantBaseEntity } from '../../core/entities/tenant-base.entity';
import { User } from '../../core/entities/internal';
import { MikroOrmTagRepository } from './repository/mikro-orm-tag.repository';

@MultiORMEntity('tag', { mikroOrmRepository: () => MikroOrmTagRepository })
export class Tag extends TenantBaseEntity {

    // to allow inference in `em.getRepository()`
    [EntityRepositoryType]?: MikroOrmTagRepository;

    @MultiORMColumn()
    name: string;

    @MultiORMColumn({ nullable: true })
    color: string;

    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    @TypeOrmManyToMany(() => User)
    @JoinTable({ name: 'tag_user' })
    @MikroOrmManyToMany({
        entity: () => Tag,
        pivotTable: 'tag_user',
        joinColumn: 'userId',
        inverseJoinColumn: 'tagId'
    })
    users?: User[];
}
