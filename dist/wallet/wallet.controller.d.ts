import { WalletService } from 'src/wallet/wallet.service';
import { InformationSent } from './wallet.types';
export declare class WalletController {
    private WalletService;
    constructor(WalletService: WalletService);
    getsaldo(idusuario: any): Promise<any>;
    gettransacciones(idusuario: any): Promise<any>;
    RequestPurchaseTickets(Informationsent: InformationSent): Promise<any[]>;
}
