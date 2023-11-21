import { Module } from '@nestjs/common';

import { ShippingDHLController } from './shipmentsdhl.controller';
import { ShippingDHLService } from './shipmentsdhl.service';

@Module({
  controllers: [ShippingDHLController],
  providers: [ShippingDHLService],
  imports: [],
})
export class ShippingDHLModule {}
