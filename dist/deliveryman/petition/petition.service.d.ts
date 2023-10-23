import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/client/market/entities/order.entity';
import { CollectPetitonDto } from './dto/collect-petition.dto';
import { Session } from '../../auth/entities/session.entity';
import { ActivatePetitionDto } from './dto/activate-petition.dto';
import { NotificationService } from '../../notification/notification.service';
import { FindPetitionsDto } from './dto/find-petitions.dto';
import { Balance } from '../../client/balance/entities/balance.entity';
export declare class PetitionService {
    private readonly orderRepository;
    private readonly sessionRepository;
    private readonly balanceRepository;
    private readonly notificationService;
    private readonly logger;
    constructor(orderRepository: Repository<Order>, sessionRepository: Repository<Session>, balanceRepository: Repository<Balance>, notificationService: NotificationService);
    private _sqlFilterOrder;
    findNearPetitions(user: User, findPetitionsDto: FindPetitionsDto): Promise<{
        petitions: Order[];
    }>;
    findPetition(user: User, orderId: number): Promise<{
        petition: Order;
    }>;
    history(user: User, orderedAt: string): Promise<{
        petitions: Order[];
    }>;
    _queryPetition(): import("typeorm").SelectQueryBuilder<Order>;
    apply(orderId: number, user: User): Promise<{
        petition: Order;
    }>;
    _getOrderAndNotify(orderId: number, deliverymanId: number): Promise<{
        petition: Order;
    }>;
    collect(orderId: number, user: User): Promise<{
        petition: Order;
    }>;
    deliver(orderId: number, user: User, collectPetitonDto: CollectPetitonDto): Promise<{
        petition: Order;
    }>;
    cancel(orderId: number, user: User): Promise<{
        petition: Order;
    }>;
    activate(activatePetitionDto: ActivatePetitionDto, user: User): Promise<boolean>;
}
