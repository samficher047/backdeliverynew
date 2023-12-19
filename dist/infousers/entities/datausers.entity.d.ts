import { BaseEntity } from "typeorm";
export declare class datausersEntity extends BaseEntity {
    id_infousers: number;
    id_user: number;
    name: string;
    lastname: string;
    email: string;
    phone: number;
    birthdate: string;
    gender: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
