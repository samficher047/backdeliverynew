import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'src/auth/entities/user.entity';
import { MarkAllChatDto } from './dto/mark-all-chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    findByOrder(id: number, paginationDto: PaginationDto): Promise<{
        messages: import("./entities/chat.entity").Chat[];
    }>;
    send(createChatDto: CreateChatDto, user: User): Promise<import("./entities/chat.entity").Chat>;
    markAllRead(markAllChatDto: MarkAllChatDto, user: User): Promise<boolean>;
}
