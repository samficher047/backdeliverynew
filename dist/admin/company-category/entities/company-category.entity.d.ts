import { Category } from "src/admin/category/entities/category.entity";
import { Company } from "src/admin/company/entities/company.entity";
export declare class CompanyCategory {
    id: number;
    updatedAt: Date;
    company: Company;
    category: Category;
}
