/* eslint-disable prettier/prettier */
import { Embeddable } from '@mikro-orm/core';
import { MultiORMColumn } from '../../../core/decorators/entity';
import { TypeOrmManyToMany } from 'src/core/decorators/entity/relations/type-orm';
import { JoinTable } from 'typeorm';
import { MikroOrmManyToMany } from 'src/core/decorators/entity/relations/mikro-orm';
import { Tag } from '../internal';

@Embeddable()
export class CustomFields {

    @MultiORMColumn({ type: 'boolean', nullable: true, default: true })
    __fix_relational_custom_fields__?: boolean;

    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    @TypeOrmManyToMany(() => Tag)
    @JoinTable({ name: 'tag_user' })
    @MikroOrmManyToMany({
        entity: () => Tag,
        pivotTable: 'tag_user',
        joinColumn: 'userId',
        inverseJoinColumn: 'tagId'
    })
    tags?: Tag[];
}