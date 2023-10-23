import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorators';
import { TypesRol } from 'src/common/glob/types';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('admin/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  @Auth(TypesRol.admin)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Auth(TypesRol.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.companyService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth(TypesRol.admin)
  findByTerm(@Param('term') term: string) {
    return this.companyService.findByTerm(term);
  }

  @Patch(':id')
  @Auth(TypesRol.admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Auth(TypesRol.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.remove(id);
  }
}
