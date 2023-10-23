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
exports.HoursOperationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const typeorm_2 = require("typeorm");
const hours_peration_entity_1 = require("./entities/hours-peration.entity");
let HoursOperationService = class HoursOperationService {
    constructor(hoursOperationRepository) {
        this.hoursOperationRepository = hoursOperationRepository;
        this.logger = new common_1.Logger('CompanyService');
    }
    async create(createHoursOperationDto) {
        try {
            const hoursOperation = this.hoursOperationRepository.create(createHoursOperationDto);
            await this.hoursOperationRepository.save(hoursOperation);
            return hoursOperation;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findByStore(storeId) {
        return await this.hoursOperationRepository.find({
            where: { store: { id: storeId }, },
            order: { day: 'ASC' }
        });
    }
    async update(id, updateHoursOperationDto) {
        try {
            const hoursOperation = await this.hoursOperationRepository.preload({ id, ...updateHoursOperationDto });
            if (hoursOperation) {
                await this.hoursOperationRepository.save(hoursOperation);
                return hoursOperation;
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`HoursOperation with id ${id} is not exist`);
    }
};
exports.HoursOperationService = HoursOperationService;
exports.HoursOperationService = HoursOperationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hours_peration_entity_1.HoursOperation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HoursOperationService);
//# sourceMappingURL=hours-peration.service.js.map