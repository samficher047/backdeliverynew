import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports: [TypeOrmModule.forFeature([Balance, User]), AuthModule],
})
export class BalanceModule { }
