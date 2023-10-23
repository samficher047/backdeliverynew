import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Max } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @Max(100)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    offset?: number;
}