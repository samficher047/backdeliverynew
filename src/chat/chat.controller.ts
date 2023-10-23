import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'src/auth/entities/user.entity';
import { TypesRol } from 'src/common/glob/types';
import { MarkAllChatDto } from './dto/mark-all-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }


  @Get('order/:id')
  findByOrder(
    @Param('id', ParseIntPipe) id: number,
    @Query() paginationDto: PaginationDto
  ) {
    return this.chatService.findByOrder(id, paginationDto);
  }

  @Post()
  @Auth(TypesRol.deliveryman, TypesRol.client)
  send(
    @Body() createChatDto: CreateChatDto,
    @GetUser() user: User,) {
    return this.chatService.send(user, createChatDto);
  }

  @Patch()
  @Auth(TypesRol.deliveryman, TypesRol.client)
  markAllRead(
    @Body() markAllChatDto: MarkAllChatDto,
    @GetUser() user: User,) {
    return this.chatService.markAllRead(user, markAllChatDto);
  }

}
