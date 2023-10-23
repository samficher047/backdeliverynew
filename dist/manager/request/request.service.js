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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const status_1 = require("../../common/glob/status");
const order_entity_1 = require("../../client/market/entities/order.entity");
const typeorm_2 = require("typeorm");
let RequestService = class RequestService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
        this.logger = new common_1.Logger('RequestService');
    }
    async findNearRequests(user) {
        try {
            const requests = await this._queryRequest()
                .where('store.userId = :userId AND p.status < :statusDelivered', {
                userId: user.id, statusDelivered: status_1.StatusOrder.DELIVERED,
            }).orderBy({ 'p.id': 'ASC' }).getMany();
            return { requests };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findRequest(user, orderId) {
        try {
            const request = await this._queryRequest()
                .where('p.id = :orderId', { orderId })
                .getOne();
            return { request };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async history(user, orderedAt) {
        try {
            const requests = await this._queryRequest()
                .where('store.userId = :userId AND p.orderedAt = :orderedAt', {
                userId: user.id, orderedAt: orderedAt
            }).orderBy({ 'p.id': 'DESC' })
                .getMany();
            return { requests };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    _queryRequest() {
        return this.orderRepository.createQueryBuilder('p')
            .select(['p', 'user.id', 'user.fullName', 'user.phone', 'user.image', 'store.id', 'store.name', 'store.address', 'store.contact', 'store.location', 'company.image'])
            .innerJoin("p.user", "user")
            .innerJoin("p.store", "store")
            .innerJoin("store.company", "company");
    }
};
exports.RequestService = RequestService;
exports.RequestService = RequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RequestService);
//# sourceMappingURL=request.service.js.map