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
exports.StoreManagerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const product_entity_1 = require("../../admin/product/entities/product.entity");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const hours_peration_entity_1 = require("../../admin/hours-peration/entities/hours-peration.entity");
const store_entity_1 = require("../../admin/store/entities/store.entity");
let StoreManagerService = class StoreManagerService {
    constructor(storeRepository, productRepository, hoursOperationRepository) {
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
        this.hoursOperationRepository = hoursOperationRepository;
        this.logger = new common_1.Logger('StoreManagerService');
    }
    async companies(user) {
        const stores = await this.storeRepository.find({
            where: { user: { id: user.id }, },
            order: { id: 'DESC' },
            relations: { company: { categories: true } },
        });
        return { stores };
    }
    async products(companyId) {
        const query = this.productRepository.createQueryBuilder('cp');
        const products = await query.where('cp.companyId = :companyId', { companyId })
            .orderBy({ id: 'DESC' })
            .getMany();
        return { products };
    }
    async createProduct(createProductDto) {
        try {
            const product = this.productRepository.create(createProductDto);
            await this.productRepository.save(product);
            return { product };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async updateProduct(id, updateProductDto) {
        const { company } = updateProductDto;
        if (company)
            throw new common_1.BadRequestException(`property company should not exist`);
        try {
            const product = await this.productRepository.preload({ id, ...updateProductDto });
            if (product) {
                await this.productRepository.save(product);
                return { product };
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`Product with id: ${id} not found`);
    }
    async hours(storeId) {
        const hours = await this.hoursOperationRepository.find({
            where: { store: { id: storeId }, },
            order: { day: 'ASC' }
        });
        return { hours };
    }
    async updateHour(id, updateHoursOperationDto) {
        try {
            const hour = await this.hoursOperationRepository.preload({ id, ...updateHoursOperationDto });
            if (hour) {
                await this.hoursOperationRepository.save(hour);
                return { hour };
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`HoursOperation with id ${id} is not exist`);
    }
};
exports.StoreManagerService = StoreManagerService;
exports.StoreManagerService = StoreManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(store_entity_1.Store)),
    __param(1, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_2.InjectRepository)(hours_peration_entity_1.HoursOperation)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], StoreManagerService);
//# sourceMappingURL=store.manager.service.js.map