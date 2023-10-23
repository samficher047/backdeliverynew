import { Company } from "src/admin/company/entities/company.entity";
import { Location } from "src/common/interfaces/location.interface";
import { User } from "src/auth/entities/user.entity";
import { Order } from "src/client/market/entities/order.entity";
import { HoursOperation } from "src/admin/hours-peration/entities/hours-peration.entity";
export declare class Store {
    id: number;
    name: string;
    address: string;
    contact: string;
    email: string;
    startupCost: number;
    costKm: number;
    location: Location | string;
    sales: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    orders?: Order[];
    company: Company;
    user: User;
    hoursOperations?: HoursOperation[];
    checkLocation(): void;
}
