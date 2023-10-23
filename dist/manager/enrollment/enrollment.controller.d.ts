import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { User } from 'src/auth/entities/user.entity';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    create(user: User, createEnrollmentDto: CreateEnrollmentDto): Promise<{
        company: import("../../admin/company/entities/company.entity").Company;
    }>;
    getCategories(): Promise<{
        categories: import("../../admin/category/entities/category.entity").Category[];
    }>;
}
