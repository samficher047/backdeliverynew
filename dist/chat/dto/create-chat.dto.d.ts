import { User } from "src/auth/entities/user.entity";
import { Order } from '../../client/market/entities/order.entity';
export declare class CreateChatDto {
    message: string;
    type: number;
    to: User;
    order: Order;
    rol: string;
}
