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
exports.MarketController = void 0;
const common_1 = require("@nestjs/common");
const product_market_dto_1 = require("./dto/product-market.dto");
const company_market_dto_1 = require("./dto/company-market.dto");
const market_service_1 = require("./market.service");
const decorators_1 = require("../../auth/decorators");
const user_entity_1 = require("../../auth/entities/user.entity");
const order_market_dto_1 = require("./dto/order-market.dto");
const cost_delivery_market_dto_1 = require("./dto/cost-delivery-market.dto");
const qualify_market_dto_1 = require("./dto/qualify-market.dto");
let MarketController = class MarketController {
    constructor(marketService) {
        this.marketService = marketService;
    }
    findCompanies(storeMarketDto) {
        return this.marketService.findCompanies(storeMarketDto);
    }
    findCategories(storeMarketDto) {
        return this.marketService.findCategories(storeMarketDto);
    }
    findProductsByCompany(companyId, productMarketDto) {
        return this.marketService.findProductsByCompany(companyId, productMarketDto);
    }
    deliveryCost(companyIds, costDeliveryMarketDto, user) {
        return this.marketService.deliveryCost(user, companyIds, costDeliveryMarketDto);
    }
    findOrders(user) {
        return this.marketService.findOrders(user);
    }
    findOrder(user, orderId) {
        return this.marketService.findOrder(orderId, user);
    }
    buy(orderMarketDto, user) {
        return this.marketService.buy(user, orderMarketDto);
    }
    qualify(qualifyMarketDto, user, orderId) {
        return this.marketService.qualify(orderId, user, qualifyMarketDto);
    }
};
exports.MarketController = MarketController;
__decorate([
    (0, common_1.Get)('companies'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_market_dto_1.StoreMarketDto]),
    __metadata("design:returntype", void 0)
], MarketController.prototype, "findCompanies", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_market_dto_1.StoreMarketDto]),
    __metadata("design:returntype", void 0)
], MarketController.prototype, "findCategories", null);
__decorate([
    (0, common_1.Get)('products/company/:companyId'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_market_dto_1.ProductMarketDto]),
    __metadata("design:returntype", void 0)
], MarketController.prototype, "findProductsByCompany", null);
__decorate([
    (0, common_1.Get)('delivery-cost/companies/:companyIds'),
    (0, decorators_1.Auth)(),
    __param(0, (0, common_1.Param)('companyIds', common_1.ParseArrayPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, cost_delivery_market_dto_1.CostDeliveryMarketDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MarketController.prototype, "deliveryCost", null);
__decorate([
    (0, common_1.Get)('orders'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MarketController.prototype, "findOrders", null);
__decorate([
    (0, common_1.Get)('order/:orderId'),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], MarketController.prototype, "findOrder", null);
__decorate([
    (0, common_1.Post)('buy'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_market_dto_1.OrderMarketDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MarketController.prototype, "buy", null);
__decorate([
    (0, common_1.Patch)('qualify/:orderId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [qualify_market_dto_1.QualifyMarketDto,
        user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], MarketController.prototype, "qualify", null);
exports.MarketController = MarketController = __decorate([
    (0, common_1.Controller)('client/market'),
    __metadata("design:paramtypes", [market_service_1.MarketService])
], MarketController);
//# sourceMappingURL=market.controller.js.map