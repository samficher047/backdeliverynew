import { CompanyCategory } from "src/admin/company-category/entities/company-category.entity";
export declare class Category {
    id: number;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    companies?: CompanyCategory[];
}
