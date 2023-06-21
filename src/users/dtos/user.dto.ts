import { IsNotEmpty, IsEmail, IsBoolean } from "class-validator"

export class User{
    id? : string;

    @IsNotEmpty()
    id_number : string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    account_type: string;

    @IsNotEmpty()
    mobile_number: string;

    @IsNotEmpty()
    @IsBoolean()
    mobile_verified: boolean;

    @IsNotEmpty()
    gender : string
}
