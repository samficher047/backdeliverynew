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
exports.Credit = void 0;
const user_entity_1 = require("../../../auth/entities/user.entity");
const typeorm_1 = require("typeorm");
let Credit = class Credit {
};
exports.Credit = Credit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Credit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { default: 0, comment: 'Amount that the delivery person charged to your balance sheet' }),
    __metadata("design:type", Number)
], Credit.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Credit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.credits, { onDelete: "SET NULL" }),
    __metadata("design:type", user_entity_1.User)
], Credit.prototype, "deliveryman", void 0);
exports.Credit = Credit = __decorate([
    (0, typeorm_1.Entity)()
], Credit);
//# sourceMappingURL=credit.entity.js.map