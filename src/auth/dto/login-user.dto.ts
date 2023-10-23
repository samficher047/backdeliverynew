import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsUUID()
    idDevice: string;

    @IsOptional()
    tokenPush: string;
}
