import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { Product } from '../../../admin/product/entities/product.entity';

export class CreatePaymentDto {
    @IsNumber()
    money: number;

    @IsString()
    currency: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => Product)
    products: JSON;
}
