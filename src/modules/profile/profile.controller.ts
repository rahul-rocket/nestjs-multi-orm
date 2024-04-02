/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { IFindManyOptions } from '../../core/crud/icrud';

@Controller('profiles')
export class ProfileController {

    constructor(
        private readonly _profileService: ProfileService
    ) { }

    /**
     * 
     * @returns 
     */
    @Get()
    async findAll() {
        return await this._profileService.findAll({
            relations: {
                user: true
            }
        });
    }

    /**
     * 
     * @returns 
     */
    @Get('find-by-query-builder')
    async findAllByJoin(@Query() options: IFindManyOptions<Profile>) {
        return await this._profileService.findAllByCreateQueryBuilder(options);
    }
}
