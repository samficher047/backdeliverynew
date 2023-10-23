import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { TypesRol } from 'src/common/glob/types';
import { User } from 'src/auth/entities/user.entity';

@Controller('admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @Auth(TypesRol.admin)
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ) {
    return this.productService.create(createProductDto, user);
  }

  @Get('company/:companyId')
  @Auth(TypesRol.admin)
  findByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query() paginationDto: PaginationDto) {
    return this.productService.findByCompany(companyId, paginationDto);
  }

  @Patch(':id')
  @Auth(TypesRol.admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(TypesRol.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
