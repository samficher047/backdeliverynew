import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class GoogleUserDto {
    @IsString()
    @MinLength(4)
    fullName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsUUID()
    idDevice: string;

    @IsOptional()
    tokenPush: string;

    @IsString()
    @MinLength(15)
    idGoogle: string;
}
