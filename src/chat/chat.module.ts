import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationModule } from '../notification/notification.module';
import { Order } from 'src/client/market/entities/order.entity';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [TypeOrmModule.forFeature([Chat, Order]), AuthModule, NotificationModule]
})
export class ChatModule { }
