import { allinfoService } from './allinfo.service';
export declare class allinfoController {
    private WalletService;
    constructor(WalletService: allinfoService);
    getsaldo(idusuario: any): Promise<any>;
}
