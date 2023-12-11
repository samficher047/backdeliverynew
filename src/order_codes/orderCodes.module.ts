import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { orderCodes } from './entities/orders.entity';
import { OrderCodes_Controller } from './orderCodes.controller';
import { OrderCodes_Service } from './orderCodes.service';

@Module({
  controllers: [OrderCodes_Controller],
  providers: [OrderCodes_Service],
  imports: [TypeOrmModule.forFeature([orderCodes])],
})
export class OrderCodesModule {}
