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
exports.User = void 0;
const class_validator_1 = require("class-validator");
const company_entity_1 = require("../../admin/company/entities/company.entity");
const credit_entity_1 = require("../../admin/credit/entities/credit.entity");
const store_entity_1 = require("../../admin/store/entities/store.entity");
const session_entity_1 = require("./session.entity");
const address_entity_1 = require("../../client/address/entities/address.entity");
const balance_entity_1 = require("../../client/balance/entities/balance.entity");
const order_entity_1 = require("../../client/market/entities/order.entity");
const payment_entity_1 = require("../../client/payments/entities/payment.entity");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../admin/product/entities/product.entity");
const chat_entity_1 = require("../../chat/entities/chat.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "idGoogle", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { select: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "passwordTemporary", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { default: '' }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [undefined] }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (products) => products.company, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => company_entity_1.Company, (company) => company.user, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "companies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_entity_1.Store, (store) => store.user, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "stores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => balance_entity_1.Balance, (balance) => balance.user, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "balances", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => credit_entity_1.Credit, (credit) => credit.deliveryman, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "credits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.Address, (address) => address.user, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payment) => payment.user, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.user, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_1.Chat, (chat) => chat.from, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], User.prototype, "chatsFrom", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_1.Chat, (chat) => chat.to, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], User.prototype, "chatsTo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (session) => session.user, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map