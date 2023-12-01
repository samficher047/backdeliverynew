import { BaseEntity } from "typeorm";
export declare class userexist extends BaseEntity {
    id: number;
    idGoogle: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    passwordTemporary: string;
    image: string;
    isActive: boolean;
    roles: string;
    createdAt: Date;
    updatedAt: Date;
}
