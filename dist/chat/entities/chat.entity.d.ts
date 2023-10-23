import { User } from 'src/auth/entities/user.entity';
import { Order } from '../../client/market/entities/order.entity';
export declare class Chat {
    id: number;
    message: string;
    type: number;
    status: number;
    createdAt: Date;
    from: User;
    to: User;
    order: Order;
}
