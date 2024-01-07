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
exports.Wallet = void 0;
const typeorm_1 = require("typeorm");
let Wallet = class Wallet extends typeorm_1.BaseEntity {
};
exports.Wallet = Wallet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Wallet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Wallet.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Wallet.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "flagentrada", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "flagsalida", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], Wallet.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', default: () => 'CURRENT_TIME' }),
    __metadata("design:type", String)
], Wallet.prototype, "hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Wallet.prototype, "status", void 0);
exports.Wallet = Wallet = __decorate([
    (0, typeorm_1.Entity)({ name: 'wallet' })
], Wallet);
//# sourceMappingURL=wallet.entity.js.map