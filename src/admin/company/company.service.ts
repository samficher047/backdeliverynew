import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

import handleDbExceptions from "src/common/exceptions/error.db.exception";

@Injectable()
export class CompanyService {

  private readonly logger = new Logger('CompanyService');

  constructor(

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = this.companyRepository.create(createCompanyDto);
      await this.companyRepository.save(company);
      return company;

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.companyRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findByTerm(term: string) {
    const company = await this.companyRepository.createQueryBuilder()
      .where('name = :name OR address LIKE :address', { name: term, address: `%${term}%` })
      .getOne();

    if (!company)
      throw new NotFoundException(`Company with term ${term} is not exist`);

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const company = await this.companyRepository.preload({ id, ...updateCompanyDto });

      if (company) {
        await this.companyRepository.save(company);
        return company;
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }

    throw new NotFoundException(`Company with id ${id} is not exist`);
  }

  async remove(id: number) {
    await this.companyRepository.softDelete({ id: id });
    return true;
  }

}
