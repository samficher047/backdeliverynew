import { Type } from "class-transformer";
import { IsLatitude, IsLongitude } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class CostDeliveryMarketDto extends PaginationDto {

    @IsLongitude()
    @Type(() => Number)
    longitude: number;

    @IsLatitude()
    @Type(() => Number)
    latitude: number;

}

