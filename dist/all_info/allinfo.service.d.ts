import { Repository } from 'typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { userexist } from 'src/users_codes/entities/users.entity';
export declare class allinfoService {
    private readonly Wallet;
    private readonly userexist;
    constructor(Wallet: Repository<Wallet>, userexist: Repository<userexist>);
    getinfouser(idusuario: any): Promise<userexist>;
}
