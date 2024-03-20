/* eslint-disable prettier/prettier */
import { EntityOptions as TypeEntityOptions } from 'typeorm';
import { EntityOptions as MikroEntityOptions } from '@mikro-orm/core';

/**
 * Represents a constructor function type.
 * @template T - Type to be instantiated.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface ConstructorType<T = any> extends Function {
    new(...args: any[]): T;
}


/**
 * Options for defining MikroORM entities.
 *
 * @template T - Type of the entity.
 */
export type MikroOrmEntityOptions<T> = MikroEntityOptions<T> & {
    /**
     * Optional function returning the repository constructor.
     */
    mikroOrmRepository?: () => ConstructorType;
};

/**
 * Options for TypeORM entities.
 */
export type TypeOrmEntityOptions = TypeEntityOptions & {
    /**
     * Optional function returning the repository constructor.
     */
    typeOrmRepository?: () => ConstructorType;
};
