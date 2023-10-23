import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyCategory } from "src/admin/company-category/entities/company-category.entity";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [TypeOrmModule.forFeature([Company, CompanyCategory]), AuthModule], 
})
export class CompanyModule { }
