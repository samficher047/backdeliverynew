import { BaseEntity } from 'typeorm';
export declare class entityimagesMarket extends BaseEntity {
    id_imgmarket: number;
    filename: string;
    rute: string;
    size: string;
    id_user: number;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
