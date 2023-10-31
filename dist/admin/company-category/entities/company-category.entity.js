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
exports.CompanyCategory = void 0;
const category_entity_1 = require("../../category/entities/category.entity");
const company_entity_1 = require("../../company/entities/company.entity");
const typeorm_1 = require("typeorm");
let CompanyCategory = class CompanyCategory {
};
exports.CompanyCategory = CompanyCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CompanyCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CompanyCategory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.categories, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", company_entity_1.Company)
], CompanyCategory.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.companies, {
        onDelete: 'CASCADE',
        nullable: false,
        eager: true,
    }),
    __metadata("design:type", category_entity_1.Category)
], CompanyCategory.prototype, "category", void 0);
exports.CompanyCategory = CompanyCategory = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['company', 'category'])
], CompanyCategory);
//# sourceMappingURL=company-category.entity.js.map