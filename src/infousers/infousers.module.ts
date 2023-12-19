import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { addressbillingEntity } from "./entities/addressbilling.entity";
import { addres_profileEntity } from './entities/addressprofile.entity'
import { billingEntity } from './entities/billing.entity'
import { datausersEntity } from './entities/datausers.entity';
import { dataUsersController } from './infousers.controller';
import { datausersServices } from './infousers.service';

@Module({
  controllers: [dataUsersController],
  providers: [datausersServices],
  imports: [TypeOrmModule.forFeature([datausersEntity, addres_profileEntity, billingEntity, addressbillingEntity])],
})
export class DataUsersModule {}
