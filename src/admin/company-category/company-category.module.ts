import { Module } from '@nestjs/common';
import { CompanyCategoryService } from './company-category.service';
import { CompanyCategoryController } from './company-category.controller';
import { CompanyCategory } from './entities/company-category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CompanyCategoryController],
  providers: [CompanyCategoryService],
  imports: [TypeOrmModule.forFeature([CompanyCategory]), AuthModule],

})
export class CompanyCategoryModule { }
