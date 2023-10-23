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
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("../../admin/company/entities/company.entity");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("../../admin/store/entities/store.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const hours_peration_entity_1 = require("../../admin/hours-peration/entities/hours-peration.entity");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const company_category_entity_1 = require("../../admin/company-category/entities/company-category.entity");
const category_entity_1 = require("../../admin/category/entities/category.entity");
const types_1 = require("../../common/glob/types");
const error_1 = require("../../common/glob/error");
let EnrollmentService = class EnrollmentService {
    constructor(companyRepository, storeRepository, companyCategoryRepository, hoursOperationRepository, categoryRepository, userRepository) {
        this.companyRepository = companyRepository;
        this.storeRepository = storeRepository;
        this.companyCategoryRepository = companyCategoryRepository;
        this.hoursOperationRepository = hoursOperationRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger('EnrollmentService');
    }
    async create(user, createEnrollmentDto) {
        const { name } = createEnrollmentDto;
        if (user.roles.includes(types_1.TypesRol.deliveryman)) {
            throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.DELIVERYMANCANNOTBEMANAGER });
        }
        const company = await this.companyRepository.createQueryBuilder().where('UPPER(name) = :name', { name: name.toLocaleUpperCase() }).getOne();
        if (company)
            throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.NAMEUNIQUE });
        const { categoryId } = createEnrollmentDto;
        try {
            const company = this.companyRepository.create(createEnrollmentDto);
            company.user = user;
            await this.companyRepository.save(company);
            const store = this.storeRepository.create(createEnrollmentDto);
            store.user = user;
            store.company = company;
            await this.storeRepository.save(store);
            const companyCategory = this.companyCategoryRepository
                .create({ company, category: { id: categoryId } });
            await this.companyCategoryRepository.save(companyCategory);
            for (let day = 0; day < 7; day++) {
                const hoursOperation = this.hoursOperationRepository.create({ store, day });
                await this.hoursOperationRepository.save(hoursOperation);
            }
            if (!user.roles.includes(types_1.TypesRol.manager)) {
                this.userRepository.createQueryBuilder('uss')
                    .update({ roles: [...user.roles, types_1.TypesRol.manager] })
                    .where({ id: user.id }).execute();
            }
            return { company };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async getCategories() {
        const categories = await this.categoryRepository.find();
        return { categories };
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(2, (0, typeorm_1.InjectRepository)(company_category_entity_1.CompanyCategory)),
    __param(3, (0, typeorm_1.InjectRepository)(hours_peration_entity_1.HoursOperation)),
    __param(4, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(5, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map