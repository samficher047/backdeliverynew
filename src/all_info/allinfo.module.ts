import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allinfoController } from './allinfo.controller';
import { allinfoService } from './allinfo.service';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { userexist } from 'src/users_codes/entities/users.entity';
@Module({
  controllers: [allinfoController],
  providers: [allinfoService],
  imports: [TypeOrmModule.forFeature([Wallet, userexist])],
})
export class allinfoModule {}
