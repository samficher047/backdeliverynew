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
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const balance_entity_1 = require("./entities/balance.entity");
const typeorm_2 = require("@nestjs/typeorm");
let BalanceService = class BalanceService {
    constructor(balanceRepository) {
        this.balanceRepository = balanceRepository;
        this.logger = new common_1.Logger('BalanceService');
    }
    async findOne(user) {
        const balance = await this.balanceRepository.findOneBy({ userId: user.id });
        if (balance)
            return { balance };
        throw new common_1.BadRequestException(`The client does not have a registered balance`);
    }
};
exports.BalanceService = BalanceService;
exports.BalanceService = BalanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(balance_entity_1.Balance)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BalanceService);
//# sourceMappingURL=balance.service.js.map