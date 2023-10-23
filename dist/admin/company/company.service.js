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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./entities/company.entity");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
let CompanyService = class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
        this.logger = new common_1.Logger('CompanyService');
    }
    async create(createCompanyDto) {
        try {
            const company = this.companyRepository.create(createCompanyDto);
            await this.companyRepository.save(company);
            return company;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.companyRepository.find({
            take: limit,
            skip: offset
        });
    }
    async findByTerm(term) {
        const company = await this.companyRepository.createQueryBuilder()
            .where('name = :name OR address LIKE :address', { name: term, address: `%${term}%` })
            .getOne();
        if (!company)
            throw new common_1.NotFoundException(`Company with term ${term} is not exist`);
        return company;
    }
    async update(id, updateCompanyDto) {
        try {
            const company = await this.companyRepository.preload({ id, ...updateCompanyDto });
            if (company) {
                await this.companyRepository.save(company);
                return company;
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`Company with id ${id} is not exist`);
    }
    async remove(id) {
        await this.companyRepository.softDelete({ id: id });
        return true;
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=company.service.js.map