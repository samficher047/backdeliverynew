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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyCategoryController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../auth/decorators");
const types_1 = require("../../common/glob/types");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const company_category_service_1 = require("./company-category.service");
const create_company_category_dto_1 = require("./dto/create-company-category.dto");
const delete_company_category_dto_1 = require("./dto/delete-company-category.dto");
let CompanyCategoryController = class CompanyCategoryController {
    constructor(companyCategoryService) {
        this.companyCategoryService = companyCategoryService;
    }
    create(createCompanyCategoryDto) {
        return this.companyCategoryService.create(createCompanyCategoryDto);
    }
    findByCompany(companyId, paginationDto) {
        return this.companyCategoryService.findByCompany(companyId, paginationDto);
    }
    remove(id, deleteCompanyCategoryDto) {
        return this.companyCategoryService.remove(id, deleteCompanyCategoryDto);
    }
};
exports.CompanyCategoryController = CompanyCategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_category_dto_1.CreateCompanyCategoryDto]),
    __metadata("design:returntype", void 0)
], CompanyCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('company/:companyId'),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], CompanyCategoryController.prototype, "findByCompany", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, delete_company_category_dto_1.DeleteCompanyCategoryDto]),
    __metadata("design:returntype", void 0)
], CompanyCategoryController.prototype, "remove", null);
exports.CompanyCategoryController = CompanyCategoryController = __decorate([
    (0, common_1.Controller)('admin/company-category'),
    __metadata("design:paramtypes", [company_category_service_1.CompanyCategoryService])
], CompanyCategoryController);
//# sourceMappingURL=company-category.controller.js.map