import { Module } from '@nestjs/common';
import { HoursOperationService } from './hours-peration.service';
import { HoursOperationController } from './hours-peration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HoursOperation } from './entities/hours-peration.entity';

@Module({
  controllers: [HoursOperationController],
  providers: [HoursOperationService],
  imports: [TypeOrmModule.forFeature([HoursOperation]), AuthModule]

})
export class HoursOperationModule { }
