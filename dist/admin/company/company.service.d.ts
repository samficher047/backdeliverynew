import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
export declare class CompanyService {
    private readonly companyRepository;
    private readonly logger;
    constructor(companyRepository: Repository<Company>);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    findAll(paginationDto: PaginationDto): Promise<Company[]>;
    findByTerm(term: string): Promise<Company>;
    update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    remove(id: number): Promise<boolean>;
}
