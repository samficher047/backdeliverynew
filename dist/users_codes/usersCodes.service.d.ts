import { Repository } from 'typeorm';
import { userexist } from './entities/users.entity';
import { users_code } from './entities/usersCodes.entity';
import { updateInfo, updateInfoSec } from './usersCodes.types';
export declare class users_CodesService {
    private readonly infoUsers;
    private readonly setinfopri;
    constructor(infoUsers: Repository<users_code>, setinfopri: Repository<userexist>);
    GenerateCode(idUsers: any): Promise<any>;
    getInfoUsers(idUsers: any): Promise<any>;
    updateInfoUser(SendRequest: updateInfo): Promise<any>;
    unionUsers(SendRequest: updateInfoSec): Promise<any>;
}
