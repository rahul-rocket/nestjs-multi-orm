/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {

    constructor(
        private readonly _tagService: TagService
    ) { }

    @Get()
    async findAll() {
        return await this._tagService.findAll({
            relations: {
                users: true
            }
        });
    }
}
