import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    fullName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    phone: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsUUID()
    idDevice: string;

    @IsOptional()
    tokenPush: string;
}
