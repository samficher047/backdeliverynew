import { dataUsers, dataAddresUser, databilling, dataAddressFiscal } from "./infousers.types";
import { Repository } from "typeorm";
import { addressbillingEntity } from "./entities/addressbilling.entity";
import { addres_profileEntity } from "./entities/addressprofile.entity";
import { billingEntity } from "./entities/billing.entity";
import { datausersEntity } from "./entities/datausers.entity";
export declare class datausersServices {
    private readonly setdatausers;
    private readonly setaddressusers;
    private readonly setbilling;
    private readonly setAddressbilling;
    constructor(setdatausers: Repository<datausersEntity>, setaddressusers: Repository<addres_profileEntity>, setbilling: Repository<billingEntity>, setAddressbilling: Repository<addressbillingEntity>);
    insertinfo(dataUsers: dataUsers): Promise<any>;
    add_Address(dataAddresUser: dataAddresUser): Promise<any>;
    postbilling(databilling: databilling): Promise<any>;
    postAddress_billing(dataAddressFiscal: dataAddressFiscal): Promise<any>;
    setlibAddress(idhotel: any): Promise<any>;
    editAddresUser(dataAddresUser: dataAddresUser): Promise<any>;
}
