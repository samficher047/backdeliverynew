
import { IsIn, IsNumber, IsPositive, Max, Min } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class CollectPetitonDto extends PaginationDto {

    @IsPositive()
    @IsNumber()
    @Min(0)
    @Max(5)
    scoreDeliveryman: number;
}