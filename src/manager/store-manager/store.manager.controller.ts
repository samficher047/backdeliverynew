import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { StoreManagerService } from './store.manager.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { TypesRol } from 'src/common/glob/types';
import { CreateProductDto } from '../../admin/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/admin/product/dto/update-product.dto';
import { UpdateHoursOperationDto } from 'src/admin/hours-peration/dto/update-hours-peration.dto';

@Controller('manager/store')
export class StoreManagerController {
  constructor(private readonly managerService: StoreManagerService) { }

  @Get('companies')
  @Auth(TypesRol.manager)
  companies(
    @GetUser() user: User,
  ) {
    return this.managerService.companies(user);
  }

  @Get('products/:companyId')
  @Auth(TypesRol.manager)
  products(
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.managerService.products(companyId);
  }

  @Post('product')
  @Auth(TypesRol.manager)
  create(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.managerService.createProduct(createProductDto);
  }

  @Patch('product/:id')
  @Auth(TypesRol.manager)
  update(@Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.managerService.updateProduct(id, updateProductDto);
  }

  @Get('hours/:id')
  @Auth(TypesRol.manager)
  hours(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.managerService.hours(id);
  }

  @Patch('hours/:id')
  @Auth(TypesRol.manager)
  updateHour(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHoursOperationDto: UpdateHoursOperationDto,) {
    return this.managerService.updateHour(id, updateHoursOperationDto);
  }

}
