import { PaginationDto } from "src/common/dto/pagination.dto";
export declare class ActivatePetitionDto extends PaginationDto {
    idDevice: number;
    isOnline: boolean;
    latitude: number;
    longitude: number;
}
