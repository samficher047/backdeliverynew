import { BaseEntity } from "typeorm";
export declare class addres_profileEntity extends BaseEntity {
    id_address: number;
    id_user: number;
    country: string;
    state: string;
    city: string;
    contry_code: number;
    delegation: string;
    street: string;
    number: number;
    interior_num: number;
    type: number;
    reference: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
