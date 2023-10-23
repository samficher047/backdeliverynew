import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { NotificationService } from 'src/notification/notification.service';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { Order } from 'src/client/market/entities/order.entity';
import { MarkAllChatDto } from './dto/mark-all-chat.dto';
import { TypesNotification, TypesRol } from 'src/common/glob/types';

@Injectable()
export class ChatService {
  private readonly logger = new Logger('ChatService');

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @Inject(NotificationService)
    private readonly notificationService: NotificationService,
  ) { }

  async send(user: User, createChatDto: CreateChatDto) {
    if (user.id === createChatDto.to.id) {
      throw new BadRequestException('The destination user cannot be the same as the sender')
    }
    const { order, message, to, rol } = createChatDto;
    try {
      const chat = this.chatRepository.create({ ...createChatDto });
      chat.from = user;
      this.chatRepository.save(chat);

      const orderBd = await this.orderRepository.findOneBy({ id: order.id })
      if (rol === TypesRol.client) {
        orderBd.notificationsDeliveryman++;
      } else if (rol === TypesRol.deliveryman) {
        orderBd.notificationsClient++;
      }
      await this.orderRepository.save(orderBd);

      const data = {
        "type": TypesNotification.MESSAGE_CHAT,
        "title": user.fullName,
        "body": message,

        "message": message,
        "fromId": `${user.id}`,
        "orderId": `${order.id}`
      };
      this.notificationService.notify(to.id, data);
      return chat;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async markAllRead(user: User, markAllChatDto: MarkAllChatDto) {
    const { order, rol } = markAllChatDto;
    try {
      let update: any;
      if (rol === TypesRol.client) {
        update = { notificationsClient: 0 };
      } else if (rol === TypesRol.deliveryman) {
        update = { notificationsDeliveryman: 0 };
      }
      if (update) await this.orderRepository.createQueryBuilder('s')
        .update({ ...update })
        .where({ id: order.id }).execute();
      return true;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findByOrder(orderId: number, paginationDto: PaginationDto) {
    const messages = await this.chatRepository.find({
      where: { order: { id: orderId }, },
      order: { id: 'DESC' },
      select: { id: true, message: true, createdAt: true, type: true, status: true, from: { id: true } },
      relations: { from: true },
    });
    return { messages };
  }
}
