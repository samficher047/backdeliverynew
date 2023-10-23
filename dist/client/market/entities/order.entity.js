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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const store_entity_1 = require("../../../admin/store/entities/store.entity");
const user_entity_1 = require("../../../auth/entities/user.entity");
const typeorm_1 = require("typeorm");
const chat_entity_1 = require("../../../chat/entities/chat.entity");
const class_validator_1 = require("class-validator");
const status_1 = require("../../../common/glob/status");
let Order = class Order {
    checkLocation() {
        this.location = `${this.location['x']}, ${this.location['y']}`;
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Order.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { default: status_1.StatusOrder.STARTED }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "scoreDeliveryman", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "scoreClient", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Object)
], Order.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Order.prototype, "deliveryFee", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, comment: 'Profit the deliveryman by the shipment' }),
    __metadata("design:type", Number)
], Order.prototype, "deliverymanProfit", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true, comment: 'Profit the app by the shipment' }),
    __metadata("design:type", Number)
], Order.prototype, "deliveryAppProfit", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { comment: 'Types Payment' }),
    __metadata("design:type", Number)
], Order.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.Column)("point"),
    (0, typeorm_1.Index)({ spatial: true }),
    __metadata("design:type", Object)
], Order.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "notificationsDeliveryman", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "notificationsClient", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], Order.prototype, "orderedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, (store) => store.orders, { onDelete: 'CASCADE', nullable: false }),
    __metadata("design:type", store_entity_1.Store)
], Order.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.orders, { onDelete: "SET NULL", nullable: false }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.orders, { onDelete: "SET NULL", nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "deliveryman", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Order.prototype, "checkLocation", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_1.Chat, (chat) => chat.order, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], Order.prototype, "chats", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
//# sourceMappingURL=order.entity.js.map