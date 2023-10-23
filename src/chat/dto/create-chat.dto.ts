import { Type } from "class-transformer";
import { IsObject, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { Order } from '../../client/market/entities/order.entity';

export class CreateChatDto {

    @IsString()
    @MinLength(1)
    @MaxLength(1200)
    message: string;

    @IsPositive()
    type: number;

    @IsObject()
    @ValidateNested()
    @Type(() => User)
    to: User;

    @IsObject()
    @ValidateNested()
    @Type(() => Order)
    order: Order;

    @IsString()
    @MinLength(1)
    rol: string;
}
