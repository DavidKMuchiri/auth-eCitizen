import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { config } from 'dotenv';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private readonly usersService: UsersService){}

    async verifCode(code: string){
        try {
            const payload = await this.jwtService.verifyAsync(code, {secret: process.env.JWT_SECRET});
            return payload;
        } catch (error) {
            throw new HttpException("Code provided is invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    async getCode(client_id: string, response_type: string){
        const existingUser = await this.usersService.getUserByIdNumber(client_id);

        if(!existingUser){
            throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
        }else if(response_type !== "code"){
            throw new HttpException("The request is missing a required paramter, include", HttpStatus.BAD_REQUEST);
        }

        let token_payload = {sub: client_id}
        const newToken = await this.jwtService.signAsync(token_payload, {
            expiresIn: process.env.JWT_CODE_EXPIRATION,
        })

        return {code: newToken}
    }


    async getAccessToken(body: any){
        if(!body.client_id || !body.client_secret || !body.grant_type || !body.code || !body.redirect_url){
            throw new HttpException("The request is missing a required paramter, include", HttpStatus.BAD_REQUEST);
        }
        const code_payload = await this.verifCode(body.code);
        if(code_payload["sub"] !== body.client_id){
            throw new HttpException("Code provided does not match client ID", HttpStatus.BAD_REQUEST);
        }

        let token_payload = {sub: body.client_id, grant_type: body.grant_type};
        const newToken = await this.jwtService.signAsync(token_payload, {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        })

        return {
            access_token: newToken,
            token_type: "Bearer",
            expires_in: process.env.JWT_TOKEN_EXPIRATION
        }
    }
}
