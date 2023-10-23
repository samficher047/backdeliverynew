import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';
import { Balance } from '../balance/entities/balance.entity';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [TypeOrmModule.forFeature([Payment, User, Balance]), AuthModule]

})
export class PaymentsModule { }
