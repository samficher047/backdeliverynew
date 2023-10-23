import { User } from '../../../auth/entities/user.entity';
export declare class Balance {
    userId: number;
    balance: number;
    profit: number;
    amount: number;
    money: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
