import { BaseEntity } from 'typeorm';
export declare class entityimages1 extends BaseEntity {
    id_img: number;
    rute: string;
    id_user: number;
    type_user: number;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
