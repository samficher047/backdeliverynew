import { Repository } from 'typeorm';
import { typefiles } from './entities/files.entity';
export declare class FilesServices {
    private readonly setfiles;
    constructor(setfiles: Repository<typefiles>);
    infoFiles(idimge: any): Promise<any>;
    insertReg(id_user: any, namefile: any, newname: any, rutefile: any): Promise<any>;
    infofilesofUser(iduser: any): Promise<any>;
    deletefile(data: any): Promise<any>;
}
