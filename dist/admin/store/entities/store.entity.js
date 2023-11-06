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
exports.Store = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("../../company/entities/company.entity");
const user_entity_1 = require("../../../auth/entities/user.entity");
const order_entity_1 = require("../../../client/market/entities/order.entity");
const hours_peration_entity_1 = require("../../hours-peration/entities/hours-peration.entity");
const class_validator_1 = require("class-validator");
let Store = class Store {
    checkLocation() {
        this.location = `${this.location['x']}, ${this.location['y']}`;
    }
};
exports.Store = Store;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Store.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Store.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 1.25 }),
    __metadata("design:type", Number)
], Store.prototype, "startupCost", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0.55 }),
    __metadata("design:type", Number)
], Store.prototype, "costKm", void 0);
__decorate([
    (0, typeorm_1.Column)('point'),
    (0, typeorm_1.Index)({ spatial: true }),
    __metadata("design:type", Object)
], Store.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], Store.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Store.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Store.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true, select: false }),
    __metadata("design:type", Date)
], Store.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Store.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.store, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], Store.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.stores, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", company_entity_1.Company)
], Store.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.stores, { onDelete: 'SET NULL' }),
    __metadata("design:type", user_entity_1.User)
], Store.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hours_peration_entity_1.HoursOperation, (hoursOperation) => hoursOperation.store, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], Store.prototype, "hoursOperations", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Store.prototype, "checkLocation", null);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)()
], Store);
//# sourceMappingURL=store.entity.js.map