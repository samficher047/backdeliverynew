import { CreateCreditDto } from './dto/create-credit.dto';
import { Credit } from './entities/credit.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Balance } from 'src/client/balance/entities/balance.entity';
export declare class CreditService {
    private readonly creditRepository;
    private readonly userRepository;
    private readonly balanceRepository;
    private readonly logger;
    constructor(creditRepository: Repository<Credit>, userRepository: Repository<User>, balanceRepository: Repository<Balance>);
    topUpBalance(createCreditDto: CreateCreditDto): Promise<{
        balance: Balance;
        credit: Credit;
    }>;
}
