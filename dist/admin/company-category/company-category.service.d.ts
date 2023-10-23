import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateCompanyCategoryDto } from './dto/create-company-category.dto';
import { DeleteCompanyCategoryDto } from './dto/delete-company-category.dto';
import { CompanyCategory } from './entities/company-category.entity';
export declare class CompanyCategoryService {
    private readonly companyCategoryRepository;
    private readonly logger;
    constructor(companyCategoryRepository: Repository<CompanyCategory>);
    create(createCompanyCategoryDto: CreateCompanyCategoryDto): Promise<CompanyCategory>;
    findByCompany(companyId: number, paginationDto: PaginationDto): Promise<CompanyCategory[]>;
    remove(id: number, deleteCompanyCategoryDto: DeleteCompanyCategoryDto): Promise<boolean>;
}
