import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCreditDto } from './dto/create-credit.dto';
import { Credit } from './entities/credit.entity';
import { Repository } from 'typeorm';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { User } from 'src/auth/entities/user.entity';
import { Balance } from 'src/client/balance/entities/balance.entity';
import { ErrorCode } from '../../common/glob/error';
import { TypesRol } from '../../common/glob/types';

@Injectable()
export class CreditService {
  private readonly logger = new Logger('CreditService');

  constructor(

    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
  ) { }

  async topUpBalance(createCreditDto: CreateCreditDto) {
    const { amount, phone } = createCreditDto;

    const deliveryman = await this.userRepository.findOneBy({ phone });

    if (!deliveryman)
      throw new BadRequestException({ codeError: ErrorCode.DELIVERYMANNOTFOUND });

    if (deliveryman.roles.includes(TypesRol.manager)) {
      throw new BadRequestException({ codeError: ErrorCode.MANAGERCANNOTBEDELIVERYMAN });
    }

    try {
      const credit = this.creditRepository.create({ ...createCreditDto, deliveryman });
      await this.creditRepository.save(credit);

      let balance = await this.balanceRepository.createQueryBuilder('b')
        .where('b.userId = :deliverymanId', { deliverymanId: deliveryman.id }).getOne();

      if (balance) {
        balance.balance = balance.balance + amount;
        this.balanceRepository.save(balance);
      } else {
        const newBalance = this.balanceRepository.create({ balance: amount, user: deliveryman });
        await this.balanceRepository.save(newBalance);
        balance = newBalance;
      }

      if (!deliveryman.roles.includes(TypesRol.deliveryman)) {
        this.userRepository.createQueryBuilder('uss')
          .update({ roles: [...deliveryman.roles, TypesRol.deliveryman] })
          .where({ id: deliveryman.id }).execute();
      }

      return { balance, credit }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

}
