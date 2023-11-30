import { BaseEntity } from 'typeorm';
export declare class users_code extends BaseEntity {
    id_userscode: number;
    id_user: number;
    code: string;
    id_company: string;
    available: boolean;
    created_at: Date;
}
