import { BaseEntity } from "typeorm";
export declare class orderCodes extends BaseEntity {
    id_codeorder: number;
    id_order: number;
    id_user: string;
    id_associated: string;
    code: string;
    createdat: Date;
    updatedat: Date;
}
