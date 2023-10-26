import { BaseEntity } from 'typeorm';
export declare class entityimagesUser extends BaseEntity {
    id_imgUser: number;
    originalName: string;
    filename: string;
    rute: string;
    size: string;
    id_user: number;
    type_user: number;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
