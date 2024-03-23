/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

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
    @Get('by-join')
    async findAllByJoin() {
        return await this._profileService.findAllByJoin();
    }
}
