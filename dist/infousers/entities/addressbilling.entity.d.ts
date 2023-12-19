import { BaseEntity } from "typeorm";
export declare class addressbillingEntity extends BaseEntity {
    id_addres_fiscal: number;
    id_user: number;
    street: string;
    neighborhood: string;
    number: number;
    num_inter: number;
    contry_code: number;
    city: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
