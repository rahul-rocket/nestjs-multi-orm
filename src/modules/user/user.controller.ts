/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ) { }

    @Get()
    async findAll() {
        return await this._userService.findAll({
            relations: {
                customFields: {
                    tags: true
                }
            }
        });
    }

    /**
      * User login.
      *
      * @param input - User login data.
      * @returns
      */
    @Post('/')
    async create(@Body() input: User) {
        return await this._userService.create(input);
    }

    /**
      * User login.
      *
      * @param input - User login data.
      * @returns
      */
    @Post('/login')
    async login(@Body() input: any) {
        const { email, password } = input;
        return await this._userService.login({ email, password });
    }

    // Delete by ID
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this._userService.delete(id);
    }
}
