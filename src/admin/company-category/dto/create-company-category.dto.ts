import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { Category } from "src/admin/category/entities/category.entity";
import { Company } from '../../company/entities/company.entity';

export class CreateCompanyCategoryDto {

    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @IsObject()
    @ValidateNested()
    @Type(() => Category)
    category: Category;
}
