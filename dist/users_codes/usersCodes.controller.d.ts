import { users_CodesService } from 'src/users_codes/usersCodes.service';
import { updateInfo, updateInfoSec } from './usersCodes.types';
export declare class users_Codes_Controller {
    private infoUsers;
    constructor(infoUsers: users_CodesService);
    generateCode(IdUser: any): Promise<string>;
    events(IdUser: any): Promise<string>;
    updateUser(SendRequest: updateInfo): Promise<string>;
    setUnionUser(SendRequest: updateInfoSec): Promise<string>;
}
