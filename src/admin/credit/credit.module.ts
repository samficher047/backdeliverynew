import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from './entities/credit.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Balance } from 'src/client/balance/entities/balance.entity';

@Module({
  controllers: [CreditController],
  providers: [CreditService],
  imports: [TypeOrmModule.forFeature([Credit, Balance]), AuthModule]

})
export class CreditModule { }
