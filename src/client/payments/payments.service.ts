import * as qs from 'qs';
import axios from 'axios';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { User } from 'src/auth/entities/user.entity';
import { ErrorCode } from '../../common/glob/error';
import { Balance } from '../balance/entities/balance.entity';
import { StatusPayment } from 'src/common/glob/status';

@Injectable()
export class PaymentsService {

  private readonly logger = new Logger('PaymentsService');
  private readonly secretKey: string;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) {
    this.secretKey = process.env.STRIPE_SECRET_KEY;
  }

  async create(user: User, createPaymentDto: CreatePaymentDto) {
    const { money, currency } = createPaymentDto;
    try {
      const response = await this.createPaymentIntent(money, currency);
      const payment = this.paymentRepository.create({ ...createPaymentDto, user, response });
      await this.paymentRepository.save(payment);
      return payment;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async createPaymentIntent(money: number, currency: string) {
    const body = qs.stringify({
      'amount': (money * 100).toFixed(0),
      'currency': currency,
      'payment_method_types[]': 'card'
    });
    const config = {
      method: 'post',
      url: 'https://api.stripe.com/v1/payment_intents',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body
    };
    const { data } = await axios(config);
    return data;
  }

  async confirm(user: User, paymentId: number) {
    const payment = await this.paymentRepository.createQueryBuilder('py')
      .where('py.id = :paymentId AND py.userId = :userId', { paymentId, userId: user.id }).getOne();

    if (!payment)
      throw new BadRequestException({ codeError: ErrorCode.FAILEDPAYMENT });

    try {
      const response = await this.paymentRepository.createQueryBuilder('py')
        .update({ status: StatusPayment.CONFIRMED })
        .where({ id: paymentId, status: StatusPayment.STARTED }).execute();

      if (response.affected > 0) {

        const balance = await this.balanceRepository.createQueryBuilder('b')
          .where('b.userId = :userId', { userId: user.id }).getOne();

        if (balance) {
          balance.money = balance.money + payment.money;
          this.balanceRepository.save(balance);
        } else {
          const newBalance = this.balanceRepository.create({ money: payment.money, user });
          await this.balanceRepository.save(newBalance);
        }

        return true;
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }

    throw new BadRequestException({ codeError: ErrorCode.FAILEDPAYMENT });
  }

  async cancel(user: User, paymentId: number) {
    const payment = await this.paymentRepository.createQueryBuilder('py')
      .where('py.id = :paymentId AND py.userId = :userId', { paymentId, userId: user.id }).getOne();

    if (!payment)
      throw new BadRequestException({ codeError: ErrorCode.FAILEDPAYMENT });

    try {
      const response = await this.paymentRepository.createQueryBuilder('py')
        .update({ status: StatusPayment.CANCELLED })
        .where({ id: paymentId, status: StatusPayment.STARTED }).execute();

      if (response.affected > 0) return true;

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }

    throw new BadRequestException({ codeError: ErrorCode.FAILEDPAYMENT });
  }

}
