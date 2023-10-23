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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.logger = new common_1.Logger('ProductService');
    }
    async create(createProductDto, user) {
        try {
            const product = this.productRepository.create(createProductDto);
            await this.productRepository.save(product);
            return product;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findByCompany(companyId, paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const query = this.productRepository.createQueryBuilder('cp');
        const products = await query.where('cp.companyId = :companyId', { companyId })
            .take(limit)
            .skip(offset)
            .getMany();
        return products;
    }
    async update(id, updateProductDto) {
        const { company } = updateProductDto;
        if (company)
            throw new common_1.BadRequestException(`property company should not exist`);
        try {
            const product = await this.productRepository.preload({ id, ...updateProductDto });
            if (product) {
                await this.productRepository.save(product);
                return product;
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`Product with id: ${id} not found`);
    }
    async remove(id) {
        await this.productRepository.softDelete({ id: id });
        return true;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map