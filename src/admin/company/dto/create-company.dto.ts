import { Type } from "class-transformer";
import { IsEmail, IsObject, IsString, MinLength, ValidateNested } from "class-validator";

import { Location } from "src/common/interfaces/location.interface";

export class CreateCompanyDto {

    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    @MinLength(4)
    address: string;

    @IsString()
    image: string;

    @IsString()
    marker: string;

    @IsString()
    @MinLength(10)
    contact: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;
}
