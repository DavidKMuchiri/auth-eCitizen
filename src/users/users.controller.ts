import { Controller, Query, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './dtos/user.dto';
// import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('create')
    @UsePipes(new ValidationPipe())
    async addUser(@Body() body: User){
        const newUser = await this.usersService.createUser(body);

        return newUser;
    }

    @Get('info')
    async userInfo(@Query("access_token") access_token: string){
        const userInfo = await this.usersService.getUserInfo(access_token);

        return userInfo;
    }
}
