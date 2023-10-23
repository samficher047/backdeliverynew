import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { User } from 'src/auth/entities/user.entity';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(user: User, createPaymentDto: CreatePaymentDto): Promise<import("./entities/payment.entity").Payment>;
    confirm(paymentId: number, user: User): Promise<boolean>;
    cancel(paymentId: number, user: User): Promise<boolean>;
}
