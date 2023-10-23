import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CompanyCategoryService } from './company-category.service';
import { CreateCompanyCategoryDto } from './dto/create-company-category.dto';
import { DeleteCompanyCategoryDto } from './dto/delete-company-category.dto';
export declare class CompanyCategoryController {
    private readonly companyCategoryService;
    constructor(companyCategoryService: CompanyCategoryService);
    create(createCompanyCategoryDto: CreateCompanyCategoryDto): Promise<import("./entities/company-category.entity").CompanyCategory>;
    findByCompany(companyId: number, paginationDto: PaginationDto): Promise<import("./entities/company-category.entity").CompanyCategory[]>;
    remove(id: number, deleteCompanyCategoryDto: DeleteCompanyCategoryDto): Promise<boolean>;
}
