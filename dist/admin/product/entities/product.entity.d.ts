import { Company } from "src/admin/company/entities/company.entity";
export declare class Product {
    id: number;
    name: string;
    description: string;
    image: string;
    note: string;
    total: number;
    number: number;
    type: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    company: Company;
}
