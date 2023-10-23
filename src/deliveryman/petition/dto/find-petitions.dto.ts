import { IsUUID } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindPetitionsDto extends PaginationDto {

    @IsUUID()
    idDevice: string;
}