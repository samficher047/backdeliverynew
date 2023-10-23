import { Session } from '../auth/entities/session.entity';
import { Repository } from 'typeorm';
import { Order } from '../client/market/entities/order.entity';
export declare class NotificationService {
    private readonly sessionRepository;
    private readonly orderRepository;
    constructor(sessionRepository: Repository<Session>, orderRepository: Repository<Order>);
    notify(userId: number, data: {
        [key: string]: string;
    }): Promise<void>;
    notifyOrder(orderId: number, latitude: number, longitude: number, data: {
        [key: string]: string;
    }): Promise<void>;
    sendOrder(orderId: number, tokens: string[], data: {
        [key: string]: string;
    }, count: number): Promise<void>;
    private sqlFilterDeliveryMan;
}
