import { IsString, IsUUID, MinLength } from "class-validator";

export class UpdateTokenPushDto {
    @IsString()
    @MinLength(118)
    tokenPush: string;

    @IsUUID()
    idDevice: string;
}
