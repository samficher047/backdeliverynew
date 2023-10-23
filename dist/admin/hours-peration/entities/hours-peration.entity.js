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
exports.HoursOperation = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("../../store/entities/store.entity");
let HoursOperation = class HoursOperation {
};
exports.HoursOperation = HoursOperation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], HoursOperation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint'),
    __metadata("design:type", Number)
], HoursOperation.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { default: '00:00:00' }),
    __metadata("design:type", String)
], HoursOperation.prototype, "open", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { default: '00:00:00' }),
    __metadata("design:type", String)
], HoursOperation.prototype, "close", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { default: -5 }),
    __metadata("design:type", Number)
], HoursOperation.prototype, "timeZone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, (store) => store.hoursOperations, { onDelete: "CASCADE" }),
    __metadata("design:type", store_entity_1.Store)
], HoursOperation.prototype, "store", void 0);
exports.HoursOperation = HoursOperation = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["store", "day"])
], HoursOperation);
//# sourceMappingURL=hours-peration.entity.js.map