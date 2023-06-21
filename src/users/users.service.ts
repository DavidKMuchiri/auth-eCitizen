import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/user.dto';
// import {JwtS}
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService){}

    async createUser(userData: User){
        const existingUser = await this.getUserByIdNumber(userData.id_number);
        if(existingUser){
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
        }

        const newUser  = new this.userModel(userData);
        const results = await newUser.save();

        return results;
    }

    async getUserByIdNumber(idNumber: string){
        const existingUser = await this.userModel.findOne({id_number: idNumber});

        return existingUser;
    }

    async getAllUsers(){
        const allUsers = await this.userModel.find();

        return allUsers;
    }
    
    async verifToken(token: string){
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
            return payload;
        } catch (error) {
            throw new HttpException({error: "Invalid request", error_description: "The request is missing a required paramter, include"}, HttpStatus.UNAUTHORIZED);
        }
    }

    async getUserInfo(access_token: string){
        const token_payload = await this.verifToken(access_token);
        const existingUser = await this.getUserByIdNumber(token_payload['sub']);

        return existingUser;
    }

}
