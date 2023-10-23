import { IsString, MinLength } from "class-validator";

export class PasswordUserDto {
    @IsString()
    @MinLength(6)
    password: string;
}
