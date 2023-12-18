import { Repository } from "typeorm";
import { addres_profileEntity } from "./entities/addressprofile.entity";
import { datausersEntity } from "./entities/datausers.entity";
import { dataUsers, dataAddresUser } from "./infousers.types";
export declare class datausersServices {
    private readonly setdatausers;
    private readonly setaddressusers;
    constructor(setdatausers: Repository<datausersEntity>, setaddressusers: Repository<addres_profileEntity>);
    insertinfo(dataUsers: dataUsers): Promise<any>;
    add_Address(dataAddresUser: dataAddresUser): Promise<any>;
}
