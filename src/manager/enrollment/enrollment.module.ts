import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Company } from 'src/admin/company/entities/company.entity';
import { Store } from 'src/admin/store/entities/store.entity';
import { CompanyCategory } from 'src/admin/company-category/entities/company-category.entity';
import { HoursOperation } from 'src/admin/hours-peration/entities/hours-peration.entity';
import { Category } from 'src/admin/category/entities/category.entity';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  imports: [TypeOrmModule.forFeature([Store, Company, CompanyCategory, HoursOperation, Category]), AuthModule]
})
export class EnrollmentModule { }
