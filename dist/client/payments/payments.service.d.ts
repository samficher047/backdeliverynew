import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Balance } from '../balance/entities/balance.entity';
export declare class PaymentsService {
    private readonly paymentRepository;
    private readonly balanceRepository;
    private readonly logger;
    private readonly secretKey;
    constructor(paymentRepository: Repository<Payment>, balanceRepository: Repository<Balance>);
    create(user: User, createPaymentDto: CreatePaymentDto): Promise<Payment>;
    createPaymentIntent(money: number, currency: string): Promise<any>;
    confirm(user: User, paymentId: number): Promise<boolean>;
    cancel(user: User, paymentId: number): Promise<boolean>;
}
