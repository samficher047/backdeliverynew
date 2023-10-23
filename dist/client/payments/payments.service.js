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
exports.PaymentsService = void 0;
const qs = require("qs");
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const payment_entity_1 = require("./entities/payment.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const error_1 = require("../../common/glob/error");
const balance_entity_1 = require("../balance/entities/balance.entity");
const status_1 = require("../../common/glob/status");
let PaymentsService = class PaymentsService {
    constructor(paymentRepository, balanceRepository) {
        this.paymentRepository = paymentRepository;
        this.balanceRepository = balanceRepository;
        this.logger = new common_1.Logger('PaymentsService');
        this.secretKey = process.env.STRIPE_SECRET_KEY;
    }
    async create(user, createPaymentDto) {
        const { money, currency } = createPaymentDto;
        try {
            const response = await this.createPaymentIntent(money, currency);
            const payment = this.paymentRepository.create({ ...createPaymentDto, user, response });
            await this.paymentRepository.save(payment);
            return payment;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async createPaymentIntent(money, currency) {
        const body = qs.stringify({
            'amount': (money * 100).toFixed(0),
            'currency': currency,
            'payment_method_types[]': 'card'
        });
        const config = {
            method: 'post',
            url: 'https://api.stripe.com/v1/payment_intents',
            headers: {
                'Authorization': `Bearer ${this.secretKey}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: body
        };
        const { data } = await (0, axios_1.default)(config);
        return data;
    }
    async confirm(user, paymentId) {
        const payment = await this.paymentRepository.createQueryBuilder('py')
            .where('py.id = :paymentId AND py.userId = :userId', { paymentId, userId: user.id }).getOne();
        if (!payment)
            throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.FAILEDPAYMENT });
        try {
            const response = await this.paymentRepository.createQueryBuilder('py')
                .update({ status: status_1.StatusPayment.CONFIRMED })
                .where({ id: paymentId, status: status_1.StatusPayment.STARTED }).execute();
            if (response.affected > 0) {
                const balance = await this.balanceRepository.createQueryBuilder('b')
                    .where('b.userId = :userId', { userId: user.id }).getOne();
                if (balance) {
                    balance.money = balance.money + payment.money;
                    this.balanceRepository.save(balance);
                }
                else {
                    const newBalance = this.balanceRepository.create({ money: payment.money, user });
                    await this.balanceRepository.save(newBalance);
                }
                return true;
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.FAILEDPAYMENT });
    }
    async cancel(user, paymentId) {
        const payment = await this.paymentRepository.createQueryBuilder('py')
            .where('py.id = :paymentId AND py.userId = :userId', { paymentId, userId: user.id }).getOne();
        if (!payment)
            throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.FAILEDPAYMENT });
        try {
            const response = await this.paymentRepository.createQueryBuilder('py')
                .update({ status: status_1.StatusPayment.CANCELLED })
                .where({ id: paymentId, status: status_1.StatusPayment.STARTED }).execute();
            if (response.affected > 0)
                return true;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.FAILEDPAYMENT });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_2.InjectRepository)(balance_entity_1.Balance)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map