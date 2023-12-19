import { BaseEntity } from "typeorm";
export declare class billingEntity extends BaseEntity {
    id_billing: number;
    id_user: number;
    rfc: string;
    type_of_person: string;
    legal_name: string;
    payment_method: string;
    tax_regime: string;
    name: string;
    email: string;
    phone: number;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
