import { Repository } from 'typeorm';
import { InformationSent } from './wallet.types';
import { Wallet } from './entities/wallet.entity';
export declare class WalletService {
    private readonly Wallet;
    constructor(Wallet: Repository<Wallet>);
    getsaldo(idusuario: any): Promise<{
        saldo: number;
        descuentos: number;
        total: number;
    }>;
    gettransacciones(idusuario: any): Promise<Wallet[]>;
    setsaldo(Informationsent: InformationSent): Promise<Wallet[]>;
}
