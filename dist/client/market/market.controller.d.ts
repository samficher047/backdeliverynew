import { ProductMarketDto } from './dto/product-market.dto';
import { StoreMarketDto } from './dto/company-market.dto';
import { MarketService } from './market.service';
import { User } from 'src/auth/entities/user.entity';
import { OrderMarketDto } from './dto/order-market.dto';
import { CostDeliveryMarketDto } from './dto/cost-delivery-market.dto';
import { QualifyMarketDto } from './dto/qualify-market.dto';
export declare class MarketController {
    private readonly marketService;
    constructor(marketService: MarketService);
    findCompanies(storeMarketDto: StoreMarketDto): Promise<{
        companies: any[];
        products: any[];
    }>;
    findCategories(storeMarketDto: StoreMarketDto): Promise<{
        categories: import("./views/category.view.entity").ViewCategory[];
    }>;
    findProductsByCompany(companyId: number, productMarketDto: ProductMarketDto): Promise<{
        products: import("./views/product.view.entity").ViewProduct[];
    }>;
    deliveryCost(companyIds: number[], costDeliveryMarketDto: CostDeliveryMarketDto, user: User): Promise<{
        fees: any[];
    }>;
    findOrders(user: User): Promise<{
        orders: import("./entities/order.entity").Order[];
    }>;
    findOrder(user: User, orderId: number): Promise<{
        order: import("./entities/order.entity").Order;
    }>;
    buy(orderMarketDto: OrderMarketDto, user: User): Promise<import("./entities/order.entity").Order>;
    qualify(qualifyMarketDto: QualifyMarketDto, user: User, orderId: number): Promise<boolean>;
}
