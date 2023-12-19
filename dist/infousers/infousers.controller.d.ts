import { datausersServices } from "./infousers.service";
import { dataUsers, dataAddresUser, databilling, dataAddressFiscal } from "./infousers.types";
export declare class dataUsersController {
    private setServicesdataUsers;
    constructor(setServicesdataUsers: datausersServices);
    postnewuser(datausers: dataUsers): Promise<string>;
    addNewAddres(dataAddresUser: dataAddresUser): Promise<string>;
    addBilling(databilling: databilling): Promise<any>;
    addaddressfiscal(dataAddressFiscal: dataAddressFiscal): Promise<any>;
    setlibAddress(iduser: any): Promise<any>;
    editAddresUser(dataAddresUser: dataAddresUser): Promise<string>;
}
