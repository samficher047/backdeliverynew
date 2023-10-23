import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Balance } from './entities/balance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class BalanceService {

  private readonly logger = new Logger('BalanceService');

  constructor(

    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>
  ) { }


  async findOne(user: User) {
    const balance = await this.balanceRepository.findOneBy({ userId: user.id });
    if (balance)
      return { balance };

    throw new BadRequestException(`The client does not have a registered balance`);
  }

}
