import { IsNumber, Max, Min } from "class-validator";

export class QualifyMarketDto {

    @IsNumber()
    @Min(1)
    @Max(5)
    scoreClient: number;
}

