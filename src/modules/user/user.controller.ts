/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
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
            where: {
                email: 'hoster@example-ever.co'
            },
            relations: {
                role: {
                    rolePermissions: false
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
}
