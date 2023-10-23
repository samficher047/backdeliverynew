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
exports.CompanyCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const typeorm_2 = require("typeorm");
const company_category_entity_1 = require("./entities/company-category.entity");
let CompanyCategoryService = class CompanyCategoryService {
    constructor(companyCategoryRepository) {
        this.companyCategoryRepository = companyCategoryRepository;
        this.logger = new common_1.Logger('CompanyService');
    }
    async create(createCompanyCategoryDto) {
        try {
            const companyCategory = this.companyCategoryRepository.create(createCompanyCategoryDto);
            await this.companyCategoryRepository.save(companyCategory);
            return companyCategory;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    findByCompany(companyId, paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.companyCategoryRepository.find({
            take: limit,
            skip: offset,
            where: {
                company: { id: companyId },
            }
        });
    }
    async remove(id, deleteCompanyCategoryDto) {
        const { category, company } = deleteCompanyCategoryDto;
        await this.companyCategoryRepository.delete({ id: id, ...category, ...company });
        return true;
    }
};
exports.CompanyCategoryService = CompanyCategoryService;
exports.CompanyCategoryService = CompanyCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_category_entity_1.CompanyCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyCategoryService);
//# sourceMappingURL=company-category.service.js.map