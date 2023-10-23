import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/client/market/entities/order.entity';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule]

})
export class RequestModule { }
