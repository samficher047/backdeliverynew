import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/auth/entities/session.entity';
import { User } from 'src/auth/entities/user.entity';
import { Order } from '../client/market/entities/order.entity';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
  imports: [TypeOrmModule.forFeature([Session, User, Order]), AuthModule]

})
export class NotificationModule { }
