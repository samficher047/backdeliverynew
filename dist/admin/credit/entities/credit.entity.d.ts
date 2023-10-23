import { User } from "src/auth/entities/user.entity";
export declare class Credit {
    id: number;
    amount: number;
    createdAt: Date;
    deliveryman: User;
}
