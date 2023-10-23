
import { IsBoolean, IsLatitude, IsLongitude, IsUUID } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class ActivatePetitionDto extends PaginationDto {

    @IsUUID()
    idDevice: number;

    @IsBoolean()
    isOnline: boolean;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;
}