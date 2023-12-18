import { datausersServices } from "./infousers.service";
import { dataUsers, dataAddresUser } from "./infousers.types";
export declare class dataUsersController {
    private setServicesdataUsers;
    constructor(setServicesdataUsers: datausersServices);
    postnewuser(datausers: dataUsers): Promise<string>;
    addNewAddres(dataAddresUser: dataAddresUser): Promise<string>;
}
