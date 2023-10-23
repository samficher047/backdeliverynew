import { Controller, Post, Body } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { TypesRol } from 'src/common/glob/types';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';

@Controller('admin/credit')
export class CreditController {
  constructor(private readonly creditService: CreditService) { }

  @Post('top-up-balance')
  @Auth(TypesRol.admin)
  topUpBalance(
    @GetUser() user: User,
    @Body() createCreditDto: CreateCreditDto) {
    return this.creditService.topUpBalance(createCreditDto);
  }
}
