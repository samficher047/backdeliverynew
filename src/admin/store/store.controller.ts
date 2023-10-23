import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TypesRol } from 'src/common/glob/types';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('admin/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  @Auth(TypesRol.admin)
  create(
    @Body() createStoreDto: CreateStoreDto,
    @GetUser() user: User,
  ) {
    return this.storeService.create(user, createStoreDto);
  }

  @Get('company/:companyId')
  @Auth(TypesRol.admin)
  findByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query() paginationDto: PaginationDto
  ) {
    return this.storeService.findByCompany(companyId, paginationDto);
  }

  @Patch(':id')
  @Auth(TypesRol.admin)
  update(@Param('id', ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @Auth(TypesRol.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.remove(id);
  }
}
