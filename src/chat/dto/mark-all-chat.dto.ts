import { Type } from "class-transformer";
import { IsObject, IsString, MinLength, ValidateNested } from "class-validator";
import { Order } from '../../client/market/entities/order.entity';

export class MarkAllChatDto {

    @IsString()
    @MinLength(1)
    rol: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Order)
    order: Order;

}
