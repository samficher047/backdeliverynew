import { entityimagesDealers } from 'src/images/entities/dealers.entity';
import { entityimages1 } from 'src/images/entities/images.entity';
import { entityimagesUser } from 'src/images/entities/imagesUsers.entity';
import { entityimagesProduc } from 'src/images/entities/imgProduc.entity';
import { Repository } from 'typeorm';
import { entityimagesMarket } from './entities/imagesMarkets.entity';
export declare class ImagesService {
    private readonly conectimages1;
    private readonly connectimages2;
    private readonly connectImgProduc;
    private readonly connectImgDeal;
    private readonly entityimagesMarket;
    constructor(conectimages1: Repository<entityimages1>, connectimages2: Repository<entityimagesUser>, connectImgProduc: Repository<entityimagesProduc>, connectImgDeal: Repository<entityimagesDealers>, entityimagesMarket: Repository<entityimagesMarket>);
    infoimg(idimge: any): Promise<any>;
    insertReg(name: any, filename: any, path: any, size: any, originalname: any): Promise<any>;
    insertRegUser(id_user: any, filename: any, path: any, size: any, originalname: any, type: any): Promise<any>;
    infoimgUser(idimge: any): Promise<any>;
    insertRegProduc(name_prod: any, originalName: any, filename: any, rute: any, size: any, id_user: any, type_user: any, key_group: any): Promise<any>;
    infoimgProduc(idimge: any): Promise<any>;
    infoimgProduc2(idimge: any): Promise<any>;
    insertRegDeal(id_deliv: any, code_deliv: any, name_deliv: any, namefile: any, name_original: any, rute: any, size: any, id_company: any, type_com: any): Promise<any>;
    infoimgDeal(idimge: any): Promise<any>;
    insertRegMarket(id_user: any, filename: any, path: any, size: any): Promise<any>;
    insertRegProduct(id_user: any, filename: any, path: any, size: any): Promise<any>;
}
