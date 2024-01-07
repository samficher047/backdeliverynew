import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';
import { InformationSent } from './wallet.types';

@Controller('walletservices')
export class WalletController {
  constructor(private WalletService: WalletService) {}

  @Get('/getsaldo')
  public async getsaldo(@Query('id') idusuario): Promise<any> {
    const result = await this.WalletService.getsaldo(idusuario);
    //console.log(result);
    return result;
  }

  @Get('/gettransacctions')
  public async gettransacciones(@Query('id') idusuario): Promise<any> {
    const result = await this.WalletService.gettransacciones(idusuario);
    //console.log(result);
    return result;
  }

  @Post('/addbalance')
  public async RequestPurchaseTickets(
    @Body()
    Informationsent: InformationSent,
  ): Promise<any[]> {
    // console.log('entro');
    const result = await this.WalletService.setsaldo(Informationsent);
    return result;
  }
}
