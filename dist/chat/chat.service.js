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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const error_db_exception_1 = require("../common/exceptions/error.db.exception");
const notification_service_1 = require("../notification/notification.service");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./entities/chat.entity");
const order_entity_1 = require("../client/market/entities/order.entity");
const types_1 = require("../common/glob/types");
let ChatService = class ChatService {
    constructor(chatRepository, orderRepository, notificationService) {
        this.chatRepository = chatRepository;
        this.orderRepository = orderRepository;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger('ChatService');
    }
    async send(user, createChatDto) {
        if (user.id === createChatDto.to.id) {
            throw new common_1.BadRequestException('The destination user cannot be the same as the sender');
        }
        const { order, message, to, rol } = createChatDto;
        try {
            const chat = this.chatRepository.create({ ...createChatDto });
            chat.from = user;
            this.chatRepository.save(chat);
            const orderBd = await this.orderRepository.findOneBy({ id: order.id });
            if (rol === types_1.TypesRol.client) {
                orderBd.notificationsDeliveryman++;
            }
            else if (rol === types_1.TypesRol.deliveryman) {
                orderBd.notificationsClient++;
            }
            await this.orderRepository.save(orderBd);
            const data = {
                "type": types_1.TypesNotification.MESSAGE_CHAT,
                "title": user.fullName,
                "body": message,
                "message": message,
                "fromId": `${user.id}`,
                "orderId": `${order.id}`
            };
            this.notificationService.notify(to.id, data);
            return chat;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async markAllRead(user, markAllChatDto) {
        const { order, rol } = markAllChatDto;
        try {
            let update;
            if (rol === types_1.TypesRol.client) {
                update = { notificationsClient: 0 };
            }
            else if (rol === types_1.TypesRol.deliveryman) {
                update = { notificationsDeliveryman: 0 };
            }
            if (update)
                await this.orderRepository.createQueryBuilder('s')
                    .update({ ...update })
                    .where({ id: order.id }).execute();
            return true;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findByOrder(orderId, paginationDto) {
        const messages = await this.chatRepository.find({
            where: { order: { id: orderId }, },
            order: { id: 'DESC' },
            select: { id: true, message: true, createdAt: true, type: true, status: true, from: { id: true } },
            relations: { from: true },
        });
        return { messages };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, common_1.Inject)(notification_service_1.NotificationService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notification_service_1.NotificationService])
], ChatService);
//# sourceMappingURL=chat.service.js.map