import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators';
import { TypesRol } from 'src/common/glob/types';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('admin/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @Auth(TypesRol.admin)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Auth(TypesRol.admin)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoryService.findAll(paginationDto);
  }

  @Patch(':id')
  @Auth(TypesRol.admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

}
