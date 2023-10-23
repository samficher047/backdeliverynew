import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    findAll(paginationDto: PaginationDto): Promise<import("./entities/company.entity").Company[]>;
    findByTerm(term: string): Promise<import("./entities/company.entity").Company>;
    update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<import("./entities/company.entity").Company>;
    remove(id: number): Promise<boolean>;
}
