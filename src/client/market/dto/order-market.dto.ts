

import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDateString, IsNumber, IsObject, IsPositive, IsString, MinLength, ValidateNested } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { Location } from "src/common/interfaces/location.interface";
import { Store } from '../../../admin/store/entities/store.entity';
import { Product } from '../../../admin/product/entities/product.entity';

export class OrderMarketDto extends PaginationDto {

    @IsObject()
    @ValidateNested()
    @Type(() => Store)
    store: Store;

    @IsString()
    note: string;

    @IsNumber()
    deliveryFee: number;

    @IsNumber()
    total: number;

    @IsString()
    @MinLength(3)
    address: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => Product)
    products: JSON;

    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;

    //Date in the client's time zone.
    @IsDateString()
    orderedAt: Date;

    @IsPositive()
    payment: number;
}