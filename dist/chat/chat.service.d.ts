import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NotificationService } from 'src/notification/notification.service';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { Order } from 'src/client/market/entities/order.entity';
import { MarkAllChatDto } from './dto/mark-all-chat.dto';
export declare class ChatService {
    private readonly chatRepository;
    private readonly orderRepository;
    private readonly notificationService;
    private readonly logger;
    constructor(chatRepository: Repository<Chat>, orderRepository: Repository<Order>, notificationService: NotificationService);
    send(user: User, createChatDto: CreateChatDto): Promise<Chat>;
    markAllRead(user: User, markAllChatDto: MarkAllChatDto): Promise<boolean>;
    findByOrder(orderId: number, paginationDto: PaginationDto): Promise<{
        messages: Chat[];
    }>;
}
