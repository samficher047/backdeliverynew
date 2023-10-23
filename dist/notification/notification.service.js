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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const firebase = require("firebase-admin");
const session_entity_1 = require("../auth/entities/session.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const filter_1 = require("../common/glob/filter");
const order_entity_1 = require("../client/market/entities/order.entity");
const status_1 = require("../common/glob/status");
let NotificationService = class NotificationService {
    constructor(sessionRepository, orderRepository) {
        this.sessionRepository = sessionRepository;
        this.orderRepository = orderRepository;
        this.sqlFilterDeliveryMan = (latitude, longitude) => `
    s.isOnline = true AND s.location IS NOT NULL AND
    ST_DistanceSphere( 
    ST_GeomFromText('POINT(${latitude} ${longitude})'), 
      s.location::geometry) 
    <= :km
    `;
        const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIAL_JSON);
        firebase.initializeApp({ credential: firebase.credential.cert(firebaseCredentials) });
    }
    async notify(userId, data) {
        const sessions = await this.sessionRepository.createQueryBuilder('s')
            .select(['s.tokenPush'])
            .where('s.userId = :userId', { userId: userId }).getMany();
        const tokens = sessions.map(session => session.tokenPush);
        if (tokens.length > 0)
            firebase.messaging().sendMulticast({ tokens, data, android: { ttl: 0 } });
    }
    async notifyOrder(orderId, latitude, longitude, data) {
        const sessionsDeliveryman = await this.sessionRepository.createQueryBuilder('s')
            .select(['s.tokenPush'])
            .where(this.sqlFilterDeliveryMan(latitude, longitude), { km: filter_1.FilterKM.DELIVERYMAN }).getMany();
        const tokensDeliveryman = sessionsDeliveryman.map(session => session.tokenPush);
        let count = 0;
        if (tokensDeliveryman.length > 0)
            this.sendOrder(orderId, tokensDeliveryman, data, count);
        const order = await this.orderRepository.createQueryBuilder('p')
            .select(['p.id', 'store.id', 'user.id',])
            .innerJoin("p.store", "store")
            .innerJoin("store.user", "user")
            .where('p.id = :orderId', { orderId })
            .getOne();
        this.notify(order.store.user.id, data);
    }
    async sendOrder(orderId, tokens, data, count) {
        firebase.messaging().sendMulticast({ tokens, data, android: { ttl: 0 } });
        count++;
        if (count > 4)
            return;
        await new Promise(resolve => setTimeout(resolve, 8000));
        const order = await this.orderRepository.createQueryBuilder('p').select(['p.id'])
            .where("p.id = :orderId AND p.status = :status", { orderId, status: status_1.StatusOrder.STARTED }).getOne();
        if (order)
            this.sendOrder(orderId, tokens, data, count);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map