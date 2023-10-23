import { Store } from "src/admin/store/entities/store.entity";
import { User } from "src/auth/entities/user.entity";
import { Location } from "src/common/interfaces/location.interface";
import { Chat } from '../../../chat/entities/chat.entity';
export declare class Order {
    id: number;
    note: string;
    address: string;
    status: number;
    scoreDeliveryman: number;
    scoreClient: number;
    products: JSON;
    deliveryFee: number;
    total: number;
    deliverymanProfit: number;
    deliveryAppProfit: number;
    payment: number;
    location: Location | string;
    notificationsDeliveryman: number;
    notificationsClient: number;
    orderedAt: Date;
    createdAt: Date;
    store: Store;
    user: User;
    deliveryman: User;
    checkLocation(): void;
    chats?: Chat[];
}
