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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("./entities/store.entity");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
let StoreService = class StoreService {
    constructor(storeRepository) {
        this.storeRepository = storeRepository;
        this.logger = new common_1.Logger('StoreService');
    }
    async create(user, createStoreDto) {
        try {
            const store = this.storeRepository.create({ ...createStoreDto });
            store.user = user;
            await this.storeRepository.save(store);
            delete store.location;
            return store;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findByCompany(companyId, paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const query = this.storeRepository.createQueryBuilder('st');
        const stores = await query.where('st.companyId = :companyId', { companyId })
            .take(limit)
            .skip(offset)
            .getMany();
        return stores;
    }
    async update(id, updateStoreDto) {
        const { company } = updateStoreDto;
        if (company)
            throw new common_1.BadRequestException(`property company should not exist`);
        try {
            const store = await this.storeRepository.preload({
                id,
                ...updateStoreDto
            });
            if (store) {
                await this.storeRepository.save(store);
                return store;
            }
        }
        catch (error) {
            console.log(error);
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`Store with id: ${id} not found`);
    }
    async remove(id) {
        await this.storeRepository.softDelete({ id: id });
        return true;
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StoreService);
//# sourceMappingURL=store.service.js.map