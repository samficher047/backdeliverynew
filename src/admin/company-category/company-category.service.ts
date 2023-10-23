import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { Repository } from 'typeorm';
import { CreateCompanyCategoryDto } from './dto/create-company-category.dto';
import { DeleteCompanyCategoryDto } from './dto/delete-company-category.dto';
import { CompanyCategory } from './entities/company-category.entity';

@Injectable()
export class CompanyCategoryService {


  private readonly logger = new Logger('CompanyService');

  constructor(

    @InjectRepository(CompanyCategory)
    private readonly companyCategoryRepository: Repository<CompanyCategory>,
  ) { }

  async create(createCompanyCategoryDto: CreateCompanyCategoryDto) {
    try {
      const companyCategory = this.companyCategoryRepository.create(createCompanyCategoryDto);
      await this.companyCategoryRepository.save(companyCategory);
      return companyCategory;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  findByCompany(companyId: number, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.companyCategoryRepository.find({
      take: limit,
      skip: offset,
      where: {
        company: { id: companyId },
      }
    });
    // const query = this.companyCategoryRepository.createQueryBuilder('cc');
    // const companyCategories = await query.where('cc.companyId = :companyId',
    //   {
    //     companyId
    //   })
    //   .take(limit)
    //   .skip(offset)
    //   .getMany();
    // return companyCategories;
  }

  async remove(id: number, deleteCompanyCategoryDto: DeleteCompanyCategoryDto) {
    const { category, company } = deleteCompanyCategoryDto;
    await this.companyCategoryRepository.delete({ id: id, ...category, ...company });
    return true;
  }
}
