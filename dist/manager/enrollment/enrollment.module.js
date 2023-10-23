"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentModule = void 0;
const common_1 = require("@nestjs/common");
const enrollment_service_1 = require("./enrollment.service");
const enrollment_controller_1 = require("./enrollment.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../../auth/auth.module");
const company_entity_1 = require("../../admin/company/entities/company.entity");
const store_entity_1 = require("../../admin/store/entities/store.entity");
const company_category_entity_1 = require("../../admin/company-category/entities/company-category.entity");
const hours_peration_entity_1 = require("../../admin/hours-peration/entities/hours-peration.entity");
const category_entity_1 = require("../../admin/category/entities/category.entity");
let EnrollmentModule = class EnrollmentModule {
};
exports.EnrollmentModule = EnrollmentModule;
exports.EnrollmentModule = EnrollmentModule = __decorate([
    (0, common_1.Module)({
        controllers: [enrollment_controller_1.EnrollmentController],
        providers: [enrollment_service_1.EnrollmentService],
        imports: [typeorm_1.TypeOrmModule.forFeature([store_entity_1.Store, company_entity_1.Company, company_category_entity_1.CompanyCategory, hours_peration_entity_1.HoursOperation, category_entity_1.Category]), auth_module_1.AuthModule]
    })
], EnrollmentModule);
//# sourceMappingURL=enrollment.module.js.map