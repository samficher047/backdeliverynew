import { Company } from "src/admin/company/entities/company.entity";
export declare class CreateProductDto {
    name: string;
    description: string;
    image: string;
    type: number;
    price: number;
    company: Company;
}
