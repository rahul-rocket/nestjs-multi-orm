/* eslint-disable prettier/prettier */
import { DeepPartial, FindManyOptions } from "typeorm";
import {
    FindOptions as MikroFindOptions,
    FilterQuery as MikroFilterQuery,
    RequiredEntityData
} from '@mikro-orm/core';

export type IMikroOptions<T> = { where?: MikroFilterQuery<T> } & MikroFindOptions<T>;
export type IFindManyOptions<T> = FindManyOptions<T> | IMikroOptions<T>;
export type IPartialEntity<T> = DeepPartial<T> | RequiredEntityData<T>;