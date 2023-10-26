import { entityimages1 } from 'src/images/entities/images.entity';
import { entityimagesUser } from 'src/images/entities/imagesUsers.entity';
import { Repository } from 'typeorm';
export declare class ImagesService {
    private readonly conectimages1;
    private readonly connectimages2;
    constructor(conectimages1: Repository<entityimages1>, connectimages2: Repository<entityimagesUser>);
    infoimg(idimge: any): Promise<any>;
    insertReg(name: any, filename: any, path: any, size: any, originalname: any): Promise<any>;
    insertRegUser(id_user: any, filename: any, path: any, size: any, originalname: any, type: any): Promise<any>;
    infoimgUser(idimge: any): Promise<any>;
}
