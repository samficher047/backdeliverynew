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
exports.users_code = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let users_code = class users_code extends typeorm_1.BaseEntity {
};
exports.users_code = users_code;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], users_code.prototype, "id_userscode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], users_code.prototype, "id_user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(8, 8, { message: 'Code length must be 8 characters' }),
    __metadata("design:type", String)
], users_code.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], users_code.prototype, "id_company", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], users_code.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], users_code.prototype, "created_at", void 0);
exports.users_code = users_code = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users_code',
    })
], users_code);
//# sourceMappingURL=usersCodes.entity.js.map