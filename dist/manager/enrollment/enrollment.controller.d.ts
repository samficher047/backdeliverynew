import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<{
        company: import("../../admin/company/entities/company.entity").Company;
    }>;
    getCategories(): Promise<{
        categories: import("../../admin/category/entities/category.entity").Category[];
    }>;
}
