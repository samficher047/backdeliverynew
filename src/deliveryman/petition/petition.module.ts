import { Module } from '@nestjs/common';
import { PetitionService } from './petition.service';
import { PetitionController } from './petition.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/client/market/entities/order.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { Balance } from 'src/client/balance/entities/balance.entity';

@Module({
  controllers: [PetitionController],
  providers: [PetitionService],
  imports: [TypeOrmModule.forFeature([Order, Balance]), AuthModule, NotificationModule]

})
export class PetitionModule { }
