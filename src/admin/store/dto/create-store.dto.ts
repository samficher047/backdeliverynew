import { Type } from "class-transformer";
import { IsEmail, IsObject, IsString, MinLength, ValidateNested } from "class-validator";

import { Location } from "src/common/interfaces/location.interface";
import { Company } from '../../company/entities/company.entity';

export class CreateStoreDto {
    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    @MinLength(4)
    address: string;

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

    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
}
