import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { HoursOperationService } from './hours-peration.service';
import { CreateHoursOperationDto } from './dto/create-hours-peration.dto';
import { UpdateHoursOperationDto } from './dto/update-hours-peration.dto';
import { Auth } from 'src/auth/decorators';
import { TypesRol } from 'src/common/glob/types';

@Controller('admin/hours-operation')
export class HoursOperationController {
  constructor(private readonly hoursOperationService: HoursOperationService) { }

  @Post()
  @Auth(TypesRol.admin)
  create(@Body() createHoursOperationDto: CreateHoursOperationDto) {
    return this.hoursOperationService.create(createHoursOperationDto);
  }

  @Get('store/:id')
  @Auth(TypesRol.admin)
  findByStore(
    @Param('id', ParseIntPipe) id: number) {
    return this.hoursOperationService.findByStore(id);
  }

  @Patch(':id')
  @Auth(TypesRol.admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHoursOperationDto: UpdateHoursOperationDto) {
    return this.hoursOperationService.update(id, updateHoursOperationDto);
  }

}
