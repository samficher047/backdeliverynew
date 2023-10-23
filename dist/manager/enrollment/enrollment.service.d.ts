import { Company } from 'src/admin/company/entities/company.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Repository } from 'typeorm';
import { Store } from 'src/admin/store/entities/store.entity';
import { User } from 'src/auth/entities/user.entity';
import { HoursOperation } from 'src/admin/hours-peration/entities/hours-peration.entity';
import { CompanyCategory } from 'src/admin/company-category/entities/company-category.entity';
import { Category } from '../../admin/category/entities/category.entity';
export declare class EnrollmentService {
    private readonly companyRepository;
    private readonly storeRepository;
    private readonly companyCategoryRepository;
    private readonly hoursOperationRepository;
    private readonly categoryRepository;
    private readonly userRepository;
    private readonly logger;
    constructor(companyRepository: Repository<Company>, storeRepository: Repository<Store>, companyCategoryRepository: Repository<CompanyCategory>, hoursOperationRepository: Repository<HoursOperation>, categoryRepository: Repository<Category>, userRepository: Repository<User>);
    create(user: User, createEnrollmentDto: CreateEnrollmentDto): Promise<{
        company: Company;
    }>;
    getCategories(): Promise<{
        categories: Category[];
    }>;
}
