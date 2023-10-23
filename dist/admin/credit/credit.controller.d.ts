import { User } from 'src/auth/entities/user.entity';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';
export declare class CreditController {
    private readonly creditService;
    constructor(creditService: CreditService);
    topUpBalance(user: User, createCreditDto: CreateCreditDto): Promise<{
        balance: import("../../client/balance/entities/balance.entity").Balance;
        credit: import("./entities/credit.entity").Credit;
    }>;
}
