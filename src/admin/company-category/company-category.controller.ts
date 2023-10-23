import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators';
import { TypesRol } from 'src/common/glob/types';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CompanyCategoryService } from './company-category.service';
import { CreateCompanyCategoryDto } from './dto/create-company-category.dto';
import { DeleteCompanyCategoryDto } from './dto/delete-company-category.dto';

@Controller('admin/company-category')
export class CompanyCategoryController {
  constructor(private readonly companyCategoryService: CompanyCategoryService) { }

  @Post()
  @Auth(TypesRol.admin)
  create(@Body() createCompanyCategoryDto: CreateCompanyCategoryDto) {
    return this.companyCategoryService.create(createCompanyCategoryDto);
  }

  @Get('company/:companyId')
  @Auth(TypesRol.admin)
  findByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query() paginationDto: PaginationDto) {
    return this.companyCategoryService.findByCompany(companyId, paginationDto);
  }

  @Delete(':id')
  @Auth(TypesRol.admin)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Body() deleteCompanyCategoryDto: DeleteCompanyCategoryDto) {
    return this.companyCategoryService.remove(id, deleteCompanyCategoryDto);
  }
}
