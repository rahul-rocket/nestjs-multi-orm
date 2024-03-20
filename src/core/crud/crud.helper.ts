/* eslint-disable prettier/prettier */

import { FindManyOptions, FindOperator, FindOptionsOrder } from "typeorm";
import { FindOptions as MikroORMFindOptions, FilterQuery as MikroFilterQuery, OrderDefinition } from '@mikro-orm/core';

/**
 * Recursively flattens nested objects into an array of dot-notated keys.
 * If the input is already an array, returns it as is.
 *
 * @param {any} input - The input object or array to be flattened.
 * @returns {string[]} - An array of dot-notated keys.
 */
export const flatten = (input: any): any => {
    if (Array.isArray(input)) {
        // If input is already an array, return it as is
        return input;
    }

    if (typeof input === 'object' && input !== null) {
        return Object.keys(input).reduce((acc, key) => {
            const value = input[key];
            if (value) {
                const nestedKeys = flatten(value);
                const newKey = Array.isArray(value) ? key : nestedKeys.length > 0 ? `${key}.${nestedKeys.join('.')}` : key;
                return acc.concat(newKey);
            }
        }, []) || [];
    }

    // If input is neither an array nor an object, return an empty array
    return [];
};

/**
 * Convert TypeORM's FindManyOptions to MikroORM's equivalent options.
 *
 * @param options - TypeORM's FindManyOptions.
 * @returns An object with MikroORM's where and options.
 */
export function parseTypeORMFindToMikroOrm<T>(options: FindManyOptions): { where: MikroFilterQuery<T>; mikroOptions: MikroORMFindOptions<T, any, any, any> } {
    const mikroOptions: MikroORMFindOptions<T, any, any, any> = {
        disableIdentityMap: true,
    };
    let where: MikroFilterQuery<T> = {};

    // Parses TypeORM `where` option to MikroORM `where` option
    if (options && options.where) {
        where = convertTypeORMWhereToMikroORM(options.where as MikroFilterQuery<T>);
    }

    // Parses TypeORM `select` option to MikroORM `fields` option
    if (options && options.select) {
        mikroOptions.fields = flatten(options.select) as string[];
    }

    // Parses TypeORM `relations` option to MikroORM `populate` option
    if (options && options.relations) {
        mikroOptions.populate = flatten(options.relations) as string[];
    }

    // Parses TypeORM `order` option to MikroORM `orderBy` option
    if (options && options.order) {
        mikroOptions.orderBy = parseOrderOptions(options.order) as OrderDefinition<T>;
    }

    // Parses TypeORM `skip` option to MikroORM `offset` option
    if (options && options.skip) {
        mikroOptions.offset = options.skip;
    }

    // Parses TypeORM `take` option to MikroORM `limit` option
    if (options && options.take) {
        mikroOptions.limit = options.take;
    }

    return { where, mikroOptions };
}

/**
 * Parses TypeORM 'order' option to MikroORM 'orderBy' option.
 * @param order TypeORM 'order' option
 * @returns Parsed MikroORM 'orderBy' option
 */
export function parseOrderOptions(order: FindOptionsOrder<any>) {
    return Object.entries(order).reduce((acc, [key, value]) => {
        acc[key] = `${value}`.toLowerCase();
        return acc;
    }, {});
}

/**
 * Transforms a FindOperator object into a query condition suitable for database operations.
 * It handles simple conditions such as 'equal', 'in' and 'between',
 * as well as complex conditions like recursive 'not' operators and range queries with 'between'.
 *
 * @param operator A FindOperator object containing the type of condition and its corresponding value.
 * @returns A query condition in the format of a Record<string, any> that represents the translated condition.
 *          
 */
export function processFindOperator<T>(operator: FindOperator<T>) {
    switch (operator.type) {
        case 'isNull': {
            return { $eq: null };
        }
        case 'not': {
            const nested = operator.value || null;
            // If the nested value is also a FindOperator, process it recursively
            if (nested instanceof FindOperator) {
                return { $ne: processFindOperator(nested) };
            } else {
                return { $ne: nested };
            }
        }
        case 'in': {
            return { $in: operator.value };
        }
        case 'equal': {
            return { $eq: operator.value };
        }
        case 'between': {
            // Assuming the value for 'between' is an array with two elements
            return {
                $gte: operator.value[0],
                $lte: operator.value[1]
            };
        }
        // Add additional cases for other operator types if needed
        default: {
            // Handle unknown or unimplemented operator types
            console.warn(`Unsupported FindOperator type: ${operator.type}`);
            return {};
        }
    }
}

/**
 * Converts a TypeORM query condition into a format that is compatible with MikroORM.
 * This function recursively processes each condition, handling both simple key-value
 * pairs and complex nested objects including FindOperators.
 *
 * @param where The TypeORM condition to be converted, typically as a filter query object.
 * @returns An object representing the MikroORM compatible condition.
 */
export function convertTypeORMConditionToMikroORM<T>(where: MikroFilterQuery<T>) {
    const mikroORMCondition = {};

    for (const [key, value] of Object.entries(where)) {
        if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
            if (value instanceof FindOperator) {
                // Convert nested FindOperators
                mikroORMCondition[key] = processFindOperator(value);
            } else {
                // Recursively convert nested objects
                mikroORMCondition[key] = convertTypeORMConditionToMikroORM(value);
            }
        } else {
            // Assign simple key-value pairs directly
            mikroORMCondition[key] = value;
        }
    }

    return mikroORMCondition;
}

/**
 * Converts TypeORM 'where' conditions into a format compatible with MikroORM.
 * This function can handle both individual condition objects and arrays of conditions,
 * applying the necessary conversion to each condition.
 *
 * @param where The TypeORM 'where' condition or an array of conditions to be converted.
 * @returns A MikroORM compatible condition or array of conditions.
 */
export function convertTypeORMWhereToMikroORM<T>(where: MikroFilterQuery<T>) {
    // If 'where' is an array, process each condition in the array
    if (Array.isArray(where)) {
        return where.map((condition) => convertTypeORMConditionToMikroORM(condition));
    }
    // Otherwise, just convert the single condition object
    return convertTypeORMConditionToMikroORM(where);
}