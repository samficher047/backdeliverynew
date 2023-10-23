import { User } from "src/auth/entities/user.entity";
import { Location } from "src/common/interfaces/location.interface";
export declare class Address {
    id: number;
    alias: string;
    address: string;
    location: Location | string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    user: User;
    checkLocation(): void;
}
