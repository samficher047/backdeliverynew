import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShippingPackagesService } from 'src/shippingpackages/shippingpackages.service';
import { Datasend, FedExRequest, Datalabel } from './shippingpackages.types';
@Controller('shippingpackages')
export class ShippingPackagesController {
  constructor(private shippingpackages: ShippingPackagesService) {}

  @Get('/gettoken')
  public async events(): Promise<string> {
    const result = await this.shippingpackages.gettoken();
    console.log(result);
    return result;
  }

  @Post('/shipmentsrate')
  public async RequestPurchaseTickets(
    @Body()
    SendRequest: Datasend,
  ): Promise<any[]> {
    console.log('entro');
    const result = await this.shippingpackages.newrate(SendRequest);
    return result;
  }

  @Post('/shipmentsfedex')
  public async shipmentsfedex(
    @Body()
    FedExRequ: FedExRequest,
  ): Promise<any[]> {
    console.log('entro');
    const result = await this.shippingpackages.newratefedex(FedExRequ);
    return result;
  }

  @Post('/generatelabel')
  public async generatelabel(
    @Body()
    datalabel: Datalabel,
  ): Promise<any[]> {
    console.log('entro');
    const result = await this.shippingpackages.newlabel(datalabel);
    return result;
  }
}
