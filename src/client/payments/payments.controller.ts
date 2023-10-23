import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { TypesRol } from 'src/common/glob/types';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('client/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('payment')
  @Auth(TypesRol.client)
  create(
    @GetUser() user: User,
    @Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(user, createPaymentDto);
  }

  @Patch('confirm/:paymentId')
  @Auth(TypesRol.client)
  confirm(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @GetUser() user: User,
  ) {
    return this.paymentsService.confirm(user, paymentId);
  }

  @Patch('cancel/:paymentId')
  @Auth(TypesRol.client)
  cancel(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @GetUser() user: User,
  ) {
    return this.paymentsService.cancel(user, paymentId);
  }
}
