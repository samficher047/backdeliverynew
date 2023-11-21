import { ShippingDHLService } from 'src/shipmentsdhl/shipmentsdhl.service';

import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('shipingDHLpackages')
export class ShippingDHLController {
  constructor(private shippingpackages: ShippingDHLService) {}

  @Get('/gettoken')
  public async events(): Promise<any> {
    const result = await this.shippingpackages.gettoken();
    
    return result;
}
}
