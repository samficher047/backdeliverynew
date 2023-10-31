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
exports.entityimagesMarket = void 0;
const typeorm_1 = require("typeorm");
let entityimagesMarket = class entityimagesMarket extends typeorm_1.BaseEntity {
    updateTimestamps() {
        this.updated_at = new Date();
    }
};
exports.entityimagesMarket = entityimagesMarket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], entityimagesMarket.prototype, "id_imgmarket", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], entityimagesMarket.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], entityimagesMarket.prototype, "rute", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], entityimagesMarket.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], entityimagesMarket.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: () => 'true' }),
    __metadata("design:type", Boolean)
], entityimagesMarket.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], entityimagesMarket.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], entityimagesMarket.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], entityimagesMarket.prototype, "updateTimestamps", null);
exports.entityimagesMarket = entityimagesMarket = __decorate([
    (0, typeorm_1.Entity)({
        name: 'images_market',
    })
], entityimagesMarket);
//# sourceMappingURL=imagesMarkets.entity.js.map