import { ArrayMinSize, IsArray, IsObject } from "class-validator";

export class SendNotificationDto {

    @IsArray()
    @ArrayMinSize(1)
    tokens: string[];

    @IsObject()
    data: { [key: string]: string; }
}
