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
exports.PetitionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const status_1 = require("../../common/glob/status");
const order_entity_1 = require("../../client/market/entities/order.entity");
const session_entity_1 = require("../../auth/entities/session.entity");
const filter_1 = require("../../common/glob/filter");
const notification_service_1 = require("../../notification/notification.service");
const types_1 = require("../../common/glob/types");
const balance_entity_1 = require("../../client/balance/entities/balance.entity");
const error_1 = require("../../common/glob/error");
let PetitionService = class PetitionService {
    constructor(orderRepository, sessionRepository, balanceRepository, notificationService) {
        this.orderRepository = orderRepository;
        this.sessionRepository = sessionRepository;
        this.balanceRepository = balanceRepository;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger('PetitionService');
        this._sqlFilterOrder = (latitude, longitude) => `
    (
      p.deliverymanId = :deliverymanId AND p.status < :statusDelivered
    )
    OR
    (
      p.status = :statusStarted AND ST_DistanceSphere(ST_GeomFromText('POINT(${latitude} ${longitude})'),p.location::geometry) <= :km
    )`;
    }
    async findNearPetitions(user, findPetitionsDto) {
        const { idDevice } = findPetitionsDto;
        try {
            const session = await this.sessionRepository.createQueryBuilder('s')
                .select(['s.location'])
                .where('s.userId = :userId', { userId: user.id, idDevice }).getOne();
            if (!session)
                return;
            const petitions = await this._queryPetition()
                .where(this._sqlFilterOrder(session.location['x'], session.location['y']), {
                deliverymanId: user.id, statusDelivered: status_1.StatusOrder.DELIVERED, statusStarted: status_1.StatusOrder.STARTED, km: filter_1.FilterKM.DELIVERYMAN
            }).orderBy({ 'p.id': 'ASC' }).getMany();
            return { petitions };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findPetition(user, orderId) {
        try {
            const petition = await this._queryPetition()
                .where('p.id = :orderId', { orderId })
                .getOne();
            return { petition };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async history(user, orderedAt) {
        try {
            const petitions = await this._queryPetition()
                .where('p.deliverymanId = :deliverymanId AND p.orderedAt = :orderedAt', {
                deliverymanId: user.id, orderedAt: orderedAt
            }).orderBy({ 'p.id': 'DESC' })
                .getMany();
            return { petitions };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    _queryPetition() {
        return this.orderRepository.createQueryBuilder('p')
            .select(['p', 'user.id', 'user.fullName', 'user.phone', 'user.image', 'store.id', 'store.name', 'store.address', 'store.contact', 'store.location', 'company.image'])
            .innerJoin("p.user", "user")
            .innerJoin("p.store", "store")
            .innerJoin("store.company", "company");
    }
    async apply(orderId, user) {
        const balance = await this.balanceRepository.findOneBy({ userId: user.id });
        if (!balance)
            throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.NOTBALANCE, message: `The deliveryman does not have a balance sheet record` });
        const order = await this.orderRepository.createQueryBuilder('o')
            .select(['o.deliveryFee', 'o.payment']).where({ id: orderId }).getOne();
        const deliverymanProfit = order.deliveryFee * balance.profit;
        const deliveryAppProfit = order.deliveryFee - deliverymanProfit;
        if (deliveryAppProfit > balance.balance)
            throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.INSUFFICIENTBALANCE, message: `The delivery person has no balance to take the order` });
        try {
            const response = await this.orderRepository.createQueryBuilder('o')
                .update({ deliveryman: user, status: status_1.StatusOrder.ASSIGNED, deliverymanProfit, deliveryAppProfit })
                .where({ id: orderId, status: status_1.StatusOrder.STARTED, deliveryman: (0, typeorm_2.IsNull)() }).execute();
            if (response.affected > 0) {
                if (order.payment == types_1.TypesPayment.cash) {
                    balance.balance -= deliveryAppProfit;
                }
                if (order.payment == types_1.TypesPayment.money) {
                    balance.amount += deliverymanProfit;
                }
                await this.balanceRepository.save(balance);
                return this._getOrderAndNotify(orderId, user.id);
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.ORDERFULFILLED, message: `Order with id ${orderId} already attended` });
    }
    async _getOrderAndNotify(orderId, deliverymanId) {
        const petition = await this._queryPetition()
            .where('p.id = :id AND p.deliverymanId = :deliverymanId', { id: orderId, deliverymanId: deliverymanId }).getOne();
        if (petition) {
            const data = {
                "type": types_1.TypesNotification.CHANGE_ORDER_STATUS,
                "status": `${petition.status}`,
                "orderId": `${orderId}`
            };
            this.notificationService.notify(petition.user.id, data);
            return { petition };
        }
    }
    async collect(orderId, user) {
        try {
            const response = await this.orderRepository.createQueryBuilder()
                .update({ status: status_1.StatusOrder.TAKEN })
                .where({ id: orderId, status: status_1.StatusOrder.ASSIGNED, deliveryman: user }).execute();
            if (response.affected > 0) {
                return this._getOrderAndNotify(orderId, user.id);
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`Order with id ${orderId} already picked up`);
    }
    async deliver(orderId, user, collectPetitonDto) {
        const { scoreDeliveryman } = collectPetitonDto;
        try {
            const response = await this.orderRepository.createQueryBuilder()
                .update({ status: status_1.StatusOrder.DELIVERED, scoreDeliveryman: scoreDeliveryman, })
                .where({ id: orderId, status: status_1.StatusOrder.TAKEN, deliveryman: user }).execute();
            if (response.affected > 0) {
                return this._getOrderAndNotify(orderId, user.id);
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`Order with id ${orderId} already delivered`);
    }
    async cancel(orderId, user) {
        const order = await this.orderRepository.createQueryBuilder('o')
            .select(['o.total', 'o.deliverymanProfit', 'o.deliveryAppProfit', 'o.payment', 'user.id'])
            .innerJoin("o.user", "user")
            .where({ id: orderId, status: status_1.StatusOrder.ASSIGNED })
            .getOne();
        if (!order)
            throw new common_1.NotFoundException(`Order with id ${orderId} already not ASSIGNED`);
        const balanceDeliveryman = await this.balanceRepository.findOneBy({ userId: user.id });
        if (!balanceDeliveryman)
            throw new common_1.NotFoundException(`The deliveryman does not have a balance sheet record`);
        let balanceClient = null;
        if (order.payment == types_1.TypesPayment.money) {
            balanceClient = await this.balanceRepository.findOneBy({ userId: order.user.id });
            if (!balanceClient)
                throw new common_1.NotFoundException(`The client does not have a balance sheet record`);
        }
        try {
            const response = await this.orderRepository.createQueryBuilder()
                .update({ status: status_1.StatusOrder.CANCELLED })
                .where({ id: orderId, status: status_1.StatusOrder.ASSIGNED, deliveryman: user }).execute();
            if (response.affected > 0) {
                if (order.payment == types_1.TypesPayment.money) {
                    balanceClient.money += order.total;
                    balanceDeliveryman.amount -= order.deliverymanProfit;
                    await this.balanceRepository.save(balanceClient);
                    await this.balanceRepository.save(balanceDeliveryman);
                }
                else if (order.payment == types_1.TypesPayment.cash) {
                    balanceDeliveryman.balance += order.deliveryAppProfit;
                    await this.balanceRepository.save(balanceDeliveryman);
                }
                return this._getOrderAndNotify(orderId, user.id);
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`Order with id ${orderId} already not ASSIGNED`);
    }
    async activate(activatePetitionDto, user) {
        const { idDevice, isOnline, latitude, longitude } = activatePetitionDto;
        try {
            await this.sessionRepository.createQueryBuilder('s')
                .update({ isOnline, location: `${latitude}, ${longitude}` })
                .where({ user, idDevice }).execute();
            return true;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
};
exports.PetitionService = PetitionService;
exports.PetitionService = PetitionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(2, (0, typeorm_1.InjectRepository)(balance_entity_1.Balance)),
    __param(3, (0, common_1.Inject)(notification_service_1.NotificationService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notification_service_1.NotificationService])
], PetitionService);
//# sourceMappingURL=petition.service.js.map