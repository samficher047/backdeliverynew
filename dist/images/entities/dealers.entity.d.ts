import { BaseEntity } from 'typeorm';
export declare class entityimagesDealers extends BaseEntity {
    id_imgDealers: any;
    id_deliv: number;
    code_deliv: string;
    name_deliv: string;
    namefile: string;
    name_original: string;
    rute: string;
    size: number;
    id_company: number;
    type_com: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
