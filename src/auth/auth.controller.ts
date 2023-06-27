import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('oauth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get('authorize')
    async authorize(@Query('client_id') client_id: string, 
    @Query('redirect_url') redirect_url: string,
    @Query('response_type') response_type: string){
        const codeURL = await this.authService.getCode(client_id, response_type, redirect_url);
        return codeURL;
    }

    // http://52.191.62.203:8000/home
    //www.google.com?code=1234

    @Post('access-token')
    async accessToken(@Query('client_id') client_id: string, 
    @Query('redirect_url') redirect_url: string,
    @Query('grant_type') grant_type: string,
    @Query('code') code: string,
    @Query('client_secret') client_secret: string){
        const tokenURL = await this.authService.getAccessToken({client_id, client_secret, grant_type, code, redirect_url});

        return tokenURL;
    }
}
