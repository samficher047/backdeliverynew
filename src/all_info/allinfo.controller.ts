import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { allinfoService } from './allinfo.service';
import { InformationSent } from './allinfo.types';

@Controller('allinfo')
export class allinfoController {
  constructor(private WalletService: allinfoService) {}

  @Get('/getinfouser')
  public async getsaldo(@Query('id') idusuario): Promise<any> {
    const result = await this.WalletService.getinfouser(idusuario);
    //console.log(result);
    return result;
  }

  // @Get('/gettransacctions')
  // public async gettransacciones(@Query('id') idusuario): Promise<any> {
  //   const result = await this.WalletService.gettransacciones(idusuario);
  //   //console.log(result);
  //   return result;
  // }

  // @Post('/addbalance')
  // public async RequestPurchaseTickets(
  //   @Body()
  //   Informationsent: InformationSent,
  // ): Promise<any[]> {
  //   // console.log('entro');
  //   const result = await this.WalletService.setsaldo(Informationsent);
  //   return result;
  // }
}
