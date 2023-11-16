"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketService = void 0;
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const product_view_entity_1 = require("./views/product.view.entity");
const company_view_entity_1 = require("./views/company.view.entity");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const category_view_entity_1 = require("./views/category.view.entity");
const status_1 = require("../../common/glob/status");
const store_entity_1 = require("../../admin/store/entities/store.entity");
const notification_service_1 = require("../../notification/notification.service");
const types_1 = require("../../common/glob/types");
const filter_1 = require("../../common/glob/filter");
const types_2 = require("../../common/glob/types");
const balance_entity_1 = require("../balance/entities/balance.entity");
let MarketService = class MarketService {
    constructor(companyViewRepository, categoryViewRepository, productViewRepository, orderRepository, storeRepository, balanceRepository, notificationService) {
        this.companyViewRepository = companyViewRepository;
        this.categoryViewRepository = categoryViewRepository;
        this.productViewRepository = productViewRepository;
        this.orderRepository = orderRepository;
        this.storeRepository = storeRepository;
        this.balanceRepository = balanceRepository;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger('MarketService');
        this.sqlFilterStore = (latitude, longitude) => `ST_DistanceSphere( 
      ST_GeomFromText('POINT(${latitude} ${longitude})'), 
        st.location::geometry) 
      <= :km`;
    }
    async findCompanies(storeMarketDto) {
        const { limit = 1000, offset = 0, latitude, longitude, categoryId, } = storeMarketDto;
        try {
            const query = this.companyViewRepository.createQueryBuilder('st');
            let companies = [];
            if (categoryId > 0) {
                companies = await query
                    .where(this.sqlFilterStore(latitude, longitude), {
                    km: filter_1.FilterKM.STORES_NEARBY,
                })
                    .andWhere('st.categoryId = :categoryId', { categoryId })
                    .distinctOn(['id'])
                    .take(limit)
                    .skip(offset)
                    .getMany();
            }
            else {
                companies = await query
                    .where(this.sqlFilterStore(latitude, longitude), {
                    km: filter_1.FilterKM.STORES_NEARBY,
                })
                    .distinctOn(['id'])
                    .take(limit)
                    .skip(offset)
                    .getMany();
            }
            companies.sort(function (a, b) {
                return b.isOpen - a.isOpen;
            });
            const jump = Math.round(new Date().getHours() / 4);
            let companiesId = [];
            if (companies.length >= jump * 3) {
                companiesId = companies.reduce((ids, element, index) => {
                    if (element.isOpen && (index + 1) % jump == 0)
                        ids.push(element.id);
                    return ids;
                }, []);
            }
            if (companiesId.length <= 0) {
                companiesId = companies.reduce((ids, element) => {
                    if (element.isOpen)
                        ids.push(element.id);
                    return ids;
                }, []);
            }
            let products = [];
            if (companiesId.length > 0)
                products = await this.productViewRepository
                    .createQueryBuilder('p')
                    .where(`p.companyId IN (:...companiesId)`, { companiesId })
                    .orderBy({ 'p.companyId': jump % 2 == 0 ? 'ASC' : 'DESC' })
                    .getMany();
            let companyId = 0;
            products = products.reduce((products, element) => {
                if (element.companyId != companyId) {
                    products.push(element);
                    companyId = element.companyId;
                }
                return products;
            }, []);
            return { companies, products };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findCategories(storeMarketDto) {
        const { limit = 100, offset = 0, latitude, longitude } = storeMarketDto;
        try {
            const query = this.categoryViewRepository.createQueryBuilder('st');
            const categories = await query
                .where(this.sqlFilterStore(latitude, longitude), {
                km: filter_1.FilterKM.STORES_NEARBY,
            })
                .take(limit)
                .skip(offset)
                .getMany();
            return { categories };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findOrders(user) {
        try {
            const orders = await this.orderRepository
                .createQueryBuilder('p')
                .select([
                'p',
                'user.id',
                'user.fullName',
                'user.image',
                'company.image',
                'company.marker',
                'store.id',
                'store.name',
                'store.address',
                'store.location',
            ])
                .innerJoin('p.store', 'store')
                .innerJoin('store.company', 'company')
                .leftJoin('p.deliveryman', 'user')
                .where('p.userId = :userId AND (p.status <= :statusDelivered OR p.status = :statusCancelled)', {
                userId: user.id,
                statusDelivered: status_1.StatusOrder.DELIVERED,
                statusCancelled: status_1.StatusOrder.CANCELLED,
            })
                .orderBy({ 'p.id': 'DESC' })
                .getMany();
            return { orders };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findOrder(orderId, user) {
        try {
            const order = await this.orderRepository
                .createQueryBuilder('p')
                .select([
                'p',
                'user.id',
                'user.fullName',
                'user.image',
                'company.image',
                'company.marker',
                'store.id',
                'store.name',
                'store.address',
                'store.location',
            ])
                .innerJoin('p.store', 'store')
                .innerJoin('store.company', 'company')
                .leftJoin('p.deliveryman', 'user')
                .where('p.id = :orderId AND p.userId = :userId', {
                orderId,
                userId: user.id,
            })
                .getOne();
            return { order };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findProductsByCompany(companyId, productMarketDto) {
        const { limit = 100, offset = 0 } = productMarketDto;
        try {
            const products = await this.productViewRepository
                .createQueryBuilder('p')
                .where(`p.companyId = :companyId`, { companyId })
                .take(limit)
                .skip(offset)
                .getMany();
            return { products };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async deliveryCost(user, companyIds, costDeliveryMarketDto) {
        const { latitude, longitude } = costDeliveryMarketDto;
        try {
            const query = this.companyViewRepository.createQueryBuilder('st');
            const companies = await query
                .select(['st.storeId'])
                .where(this.sqlFilterStore(latitude, longitude), {
                km: filter_1.FilterKM.STORES_NEARBY,
            })
                .andWhere('st.id IN (:...companyIds) AND st.isOpen = true', {
                companyIds,
            })
                .getMany();
            const storeIds = companies.map((element) => element['storeId']);
            if (storeIds.length > 0) {
                const sqlCost = `s.name, s.companyId, c.image, c.marker, s.id AS store_id, s.startupCost + ((ST_DistanceSphere(ST_GeomFromText('POINT(${latitude} ${longitude})'), s.location::geometry) / 1000) * s.costKm) AS deliveryFee`;
                const fees = await this.storeRepository
                    .createQueryBuilder('s')
                    .select(sqlCost)
                    .innerJoin('s.company', 'c')
                    .where('s.id IN (:...storeIds)', { storeIds })
                    .getRawMany();
                return { fees };
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.BadRequestException(`companyIds`);
    }
    async buy(user, orderMarketDto) {
        const { payment, total } = orderMarketDto;
        if (payment == types_2.TypesPayment.money) {
            const balance = await this.balanceRepository.findOneBy({
                userId: user.id,
            });
            if (!balance)
                throw new common_1.BadRequestException(`The client does not have a balance sheet record`);
            if (total > balance.money)
                throw new common_1.BadRequestException(`The client has no balance to take the order`);
            balance.money = balance.money - total;
            await this.balanceRepository.save(balance);
        }
        try {
            const order = this.orderRepository.create({ ...orderMarketDto });
            order.user = user;
            await this.orderRepository.save(order);
            const data = {
                type: types_1.TypesNotification.NEW_ORDER,
                title: 'New order',
                body: user.fullName,
                orderId: `${order.id}`,
            };
            this.notificationService.notifyOrder(order.id, orderMarketDto.location.x, orderMarketDto.location.y, data);
            delete order.user;
            delete order.location;
            return order;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async qualify(orderId, user, qualifyMarketDto) {
        const { scoreClient } = qualifyMarketDto;
        await this.orderRepository
            .createQueryBuilder()
            .update({ status: status_1.StatusOrder.QUALIFIED, scoreClient })
            .where({ id: orderId, user })
            .execute();
        return true;
    }
};
exports.MarketService = MarketService;
exports.MarketService = MarketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(company_view_entity_1.ViewCompany)),
    __param(1, (0, typeorm_2.InjectRepository)(category_view_entity_1.ViewCategory)),
    __param(2, (0, typeorm_2.InjectRepository)(product_view_entity_1.ViewProduct)),
    __param(3, (0, typeorm_2.InjectRepository)(order_entity_1.Order)),
    __param(4, (0, typeorm_2.InjectRepository)(store_entity_1.Store)),
    __param(5, (0, typeorm_2.InjectRepository)(balance_entity_1.Balance)),
    __param(6, (0, common_1.Inject)(notification_service_1.NotificationService)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        notification_service_1.NotificationService])
], MarketService);
//# sourceMappingURL=market.service.js.map