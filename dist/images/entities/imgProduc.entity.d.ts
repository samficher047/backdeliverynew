import { BaseEntity } from 'typeorm';
export declare class entityimagesProduc extends BaseEntity {
    id_imgProduc: number;
    name_prod: string;
    originalName: string;
    filename: string;
    rute: string;
    size: string;
    key_group: string;
    id_user: number;
    type_user: number;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
