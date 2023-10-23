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
exports.Company = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const store_entity_1 = require("../../store/entities/store.entity");
const typeorm_1 = require("typeorm");
const company_category_entity_1 = require("../../company-category/entities/company-category.entity");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../../auth/entities/user.entity");
let Company = class Company {
    checkLocation() {
        this.location = `${this.location['x']}, ${this.location['y']}`;
    }
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Company.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { default: '' }),
    __metadata("design:type", String)
], Company.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { default: '' }),
    __metadata("design:type", String)
], Company.prototype, "marker", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("point"),
    (0, typeorm_1.Index)({ spatial: true }),
    __metadata("design:type", Object)
], Company.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Company.prototype, "checkLocation", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.companies, { onDelete: "SET NULL" }),
    __metadata("design:type", user_entity_1.User)
], Company.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (products) => products.company, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], Company.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_entity_1.Store, (stores) => stores.company, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], Company.prototype, "stores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => company_category_entity_1.CompanyCategory, (companyCategory) => companyCategory.company, { cascade: true, eager: false }),
    __metadata("design:type", Array)
], Company.prototype, "categories", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)()
], Company);
//# sourceMappingURL=company.entity.js.map