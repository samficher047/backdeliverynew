import { Type } from "class-transformer";
import { IsObject, IsString, MinLength, ValidateNested } from "class-validator";

import { Location } from "src/common/interfaces/location.interface";


export class CreateAddressDto {
    @IsString()
    @MinLength(2)
    alias: string;

    @IsString()
    @MinLength(3)
    address: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;
}
