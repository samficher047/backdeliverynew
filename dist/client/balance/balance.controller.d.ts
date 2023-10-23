import { User } from 'src/auth/entities/user.entity';
import { BalanceService } from './balance.service';
export declare class BalanceController {
    private readonly balanceService;
    constructor(balanceService: BalanceService);
    findOne(user: User): Promise<{
        balance: import("./entities/balance.entity").Balance;
    }>;
}
