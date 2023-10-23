import { ViewProduct } from './views/product.view.entity';
import { ViewCompany } from './views/company.view.entity';
import { User } from 'src/auth/entities/user.entity';
import { StoreMarketDto } from './dto/company-market.dto';
import { Repository } from 'typeorm';
import { OrderMarketDto } from './dto/order-market.dto';
import { Order } from './entities/order.entity';
import { ProductMarketDto } from './dto/product-market.dto';
import { ViewCategory } from './views/category.view.entity';
import { Store } from '../../admin/store/entities/store.entity';
import { CostDeliveryMarketDto } from './dto/cost-delivery-market.dto';
import { NotificationService } from '../../notification/notification.service';
import { QualifyMarketDto } from './dto/qualify-market.dto';
import { Balance } from '../balance/entities/balance.entity';
export declare class MarketService {
    private readonly companyViewRepository;
    private readonly categoryViewRepository;
    private readonly productViewRepository;
    private readonly orderRepository;
    private readonly storeRepository;
    private readonly balanceRepository;
    private readonly notificationService;
    private readonly logger;
    constructor(companyViewRepository: Repository<ViewCompany>, categoryViewRepository: Repository<ViewCategory>, productViewRepository: Repository<ViewProduct>, orderRepository: Repository<Order>, storeRepository: Repository<Store>, balanceRepository: Repository<Balance>, notificationService: NotificationService);
    private sqlFilterStore;
    findCompanies(storeMarketDto: StoreMarketDto): Promise<{
        companies: any[];
        products: any[];
    }>;
    findCategories(storeMarketDto: StoreMarketDto): Promise<{
        categories: ViewCategory[];
    }>;
    findOrders(user: User): Promise<{
        orders: Order[];
    }>;
    findOrder(orderId: number, user: User): Promise<{
        order: Order;
    }>;
    findProductsByCompany(companyId: number, productMarketDto: ProductMarketDto): Promise<{
        products: ViewProduct[];
    }>;
    deliveryCost(user: User, companyIds: number[], costDeliveryMarketDto: CostDeliveryMarketDto): Promise<{
        fees: any[];
    }>;
    buy(user: User, orderMarketDto: OrderMarketDto): Promise<Order>;
    qualify(orderId: number, user: User, qualifyMarketDto: QualifyMarketDto): Promise<boolean>;
}
