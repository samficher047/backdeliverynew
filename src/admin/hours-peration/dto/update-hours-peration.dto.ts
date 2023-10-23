import { IsString, MinLength } from "class-validator";

export class UpdateHoursOperationDto {
    @IsString()
    @MinLength(8)
    open: string;

    @IsString()
    @MinLength(8)
    close: string;
}
