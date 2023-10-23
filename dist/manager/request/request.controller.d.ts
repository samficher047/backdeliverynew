import { RequestService } from './request.service';
import { User } from 'src/auth/entities/user.entity';
export declare class RequestController {
    private readonly requestService;
    constructor(requestService: RequestService);
    findNearRequests(user: User): Promise<{
        requests: import("../../client/market/entities/order.entity").Order[];
    }>;
    findRequest(orderId: number, user: User): Promise<{
        request: import("../../client/market/entities/order.entity").Order;
    }>;
    history(orderedAt: string, user: User): Promise<{
        requests: import("../../client/market/entities/order.entity").Order[];
    }>;
}
