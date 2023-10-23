import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/client/market/entities/order.entity';
import { Repository } from 'typeorm';
export declare class RequestService {
    private readonly orderRepository;
    private readonly logger;
    constructor(orderRepository: Repository<Order>);
    findNearRequests(user: User): Promise<{
        requests: Order[];
    }>;
    findRequest(user: User, orderId: number): Promise<{
        request: Order;
    }>;
    history(user: User, orderedAt: string): Promise<{
        requests: Order[];
    }>;
    _queryRequest(): import("typeorm").SelectQueryBuilder<Order>;
}
