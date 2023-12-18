import { BaseEntity } from "typeorm";
export declare class typefiles extends BaseEntity {
    id_files: number;
    id_user: number;
    origin_name_file: string;
    new_name_file: string;
    rute: string;
    available: boolean;
    created_at: Date;
    updated_at: Date;
    updateTimestamps(): void;
}
