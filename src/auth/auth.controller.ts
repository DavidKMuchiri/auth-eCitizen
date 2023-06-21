import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('oauth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get('authorize')
    async authorize(@Query('client_id') client_id: string, 
    @Query('redirect_url') redirect_url: string,
    @Query('response_type') response_type: string){
        const codeObject = await this.authService.getCode(client_id, response_type);

        return codeObject;
    }

    @Post('access-token')
    async accessToken(@Body() body: any){
        const tokenObject = await this.authService.getAccessToken(body);

        return tokenObject;
    }
}
