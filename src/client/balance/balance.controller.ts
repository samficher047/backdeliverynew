import { Controller, Get } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { BalanceService } from './balance.service';

@Controller('client/balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) { }

  @Get()
  @Auth()
  findOne(
    @GetUser() user: User,
  ) {
    return this.balanceService.findOne(user);
  }
}
