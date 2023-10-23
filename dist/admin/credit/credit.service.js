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
exports.CreditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const credit_entity_1 = require("./entities/credit.entity");
const typeorm_2 = require("typeorm");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const user_entity_1 = require("../../auth/entities/user.entity");
const balance_entity_1 = require("../../client/balance/entities/balance.entity");
const error_1 = require("../../common/glob/error");
const types_1 = require("../../common/glob/types");
let CreditService = class CreditService {
    constructor(creditRepository, userRepository, balanceRepository) {
        this.creditRepository = creditRepository;
        this.userRepository = userRepository;
        this.balanceRepository = balanceRepository;
        this.logger = new common_1.Logger('CreditService');
    }
    async topUpBalance(createCreditDto) {
        const { amount, phone } = createCreditDto;
        const deliveryman = await this.userRepository.findOneBy({ phone });
        if (!deliveryman)
            throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.DELIVERYMANNOTFOUND });
        if (deliveryman.roles.includes(types_1.TypesRol.manager)) {
            throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.MANAGERCANNOTBEDELIVERYMAN });
        }
        try {
            const credit = this.creditRepository.create({ ...createCreditDto, deliveryman });
            await this.creditRepository.save(credit);
            let balance = await this.balanceRepository.createQueryBuilder('b')
                .where('b.userId = :deliverymanId', { deliverymanId: deliveryman.id }).getOne();
            if (balance) {
                balance.balance = balance.balance + amount;
                this.balanceRepository.save(balance);
            }
            else {
                const newBalance = this.balanceRepository.create({ balance: amount, user: deliveryman });
                await this.balanceRepository.save(newBalance);
                balance = newBalance;
            }
            if (!deliveryman.roles.includes(types_1.TypesRol.deliveryman)) {
                this.userRepository.createQueryBuilder('uss')
                    .update({ roles: [...deliveryman.roles, types_1.TypesRol.deliveryman] })
                    .where({ id: deliveryman.id }).execute();
            }
            return { balance, credit };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
};
exports.CreditService = CreditService;
exports.CreditService = CreditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(credit_entity_1.Credit)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(balance_entity_1.Balance)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CreditService);
//# sourceMappingURL=credit.service.js.map