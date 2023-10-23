import { Controller, Post, Body, Get } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { User } from 'src/auth/entities/user.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { TypesRol } from 'src/common/glob/types';

@Controller('manager/enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) { }

  @Post()
  @Auth(TypesRol.client)
  create(
    @GetUser() user: User,
    @Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(user, createEnrollmentDto);
  }

  @Get('get-categories')
  @Auth(TypesRol.client)
  getCategories() {
    return this.enrollmentService.getCategories();
  }

}
