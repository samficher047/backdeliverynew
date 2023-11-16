import { Module } from '@nestjs/common';
import { ShippingPackagesController } from './shippingpackages.controller';
import { ShippingPackagesService } from './shippingpackages.service';

@Module({
  controllers: [ShippingPackagesController],
  providers: [ShippingPackagesService],
  imports: [],
})
export class ShippingPackagesModule {}
