import { entityimages1 } from 'src/images/entities/images.entity';
import { entityimagesUser } from 'src/images/entities/imagesUsers.entity';
import { entityimagesProduc } from 'src/images/entities/imgProduc.entity';
import { Repository } from 'typeorm';
export declare class ImagesService {
    private readonly conectimages1;
    private readonly connectimages2;
    private readonly connectImgProduc;
    constructor(conectimages1: Repository<entityimages1>, connectimages2: Repository<entityimagesUser>, connectImgProduc: Repository<entityimagesProduc>);
    infoimg(idimge: any): Promise<any>;
    insertReg(name: any, filename: any, path: any, size: any, originalname: any): Promise<any>;
    insertRegUser(id_user: any, filename: any, path: any, size: any, originalname: any, type: any): Promise<any>;
    infoimgUser(idimge: any): Promise<any>;
    insertRegProduc(name_prod: any, originalName: any, filename: any, rute: any, size: any, id_user: any, type_user: any, key_group: any): Promise<any>;
    infoimgProduc(idimge: any): Promise<any>;
    infoimgProduc2(idimge: any): Promise<any>;
}
