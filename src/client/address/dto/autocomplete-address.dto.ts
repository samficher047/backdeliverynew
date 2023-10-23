import { Type } from "class-transformer";
import { IsLatitude, IsLongitude } from "class-validator";


export class AutocompleteAddressDto {

    @IsLongitude()
    @Type(() => Number)
    longitude: number;

    @IsLatitude()
    @Type(() => Number)
    latitude: number;

}