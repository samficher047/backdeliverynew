import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RequestService } from './request.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { TypesRol } from 'src/common/glob/types';
import { User } from 'src/auth/entities/user.entity';

@Controller('manager/request')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Get('near')
  @Auth(TypesRol.manager)
  findNearRequests(
    @GetUser() user: User,
  ) {
    return this.requestService.findNearRequests(user);
  }

  @Get('id/:orderId')
  @Auth(TypesRol.manager)
  findRequest(
    @Param('orderId', ParseIntPipe) orderId: number,
    @GetUser() user: User,
  ) {
    return this.requestService.findRequest(user, orderId);
  }


  @Get('ordered-at/:orderedAt')
  @Auth(TypesRol.manager)
  history(
    @Param('orderedAt') orderedAt: string,
    @GetUser() user: User,
  ) {
    return this.requestService.history(user, orderedAt);
  }
}
