import { User } from "src/auth/entities/user.entity";
export declare class Payment {
    id: number;
    money: number;
    status: number;
    currency: string;
    products: JSON;
    response: JSON;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
