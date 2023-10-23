import { Repository } from 'typeorm';
import { Balance } from './entities/balance.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class BalanceService {
    private readonly balanceRepository;
    private readonly logger;
    constructor(balanceRepository: Repository<Balance>);
    findOne(user: User): Promise<{
        balance: Balance;
    }>;
}
