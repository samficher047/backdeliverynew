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
exports.Balance = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../auth/entities/user.entity");
let Balance = class Balance {
};
exports.Balance = Balance;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Balance.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0, comment: 'Balance of money the deliveryman has to be able to take orders' }),
    __metadata("design:type", Number)
], Balance.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0.85, comment: 'Percentage of the value of the shipment. Benefit for the deliveryman' }),
    __metadata("design:type", Number)
], Balance.prototype, "profit", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0, comment: 'Amount to be returned to the deliveryman. This value increases when the deliveryman takes orders with electronic payments' }),
    __metadata("design:type", Number)
], Balance.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0, comment: 'Money that the client has to make payments in the APP.' }),
    __metadata("design:type", Number)
], Balance.prototype, "money", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Balance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Balance.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.balances, { onDelete: "SET NULL" }),
    __metadata("design:type", user_entity_1.User)
], Balance.prototype, "user", void 0);
exports.Balance = Balance = __decorate([
    (0, typeorm_1.Entity)()
], Balance);
//# sourceMappingURL=balance.entity.js.map