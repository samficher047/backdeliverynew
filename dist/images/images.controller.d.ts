/// <reference types="multer" />
import { ImagesService } from 'src/images/images.service';
export declare class GaleryController {
    private imagesServ;
    constructor(imagesServ: ImagesService);
    events(idimge: any): Promise<any[]>;
    insertphoto(name: string, image: Express.Multer.File): Promise<string>;
    insertphotoUser(id_user: number, type: number, image: Express.Multer.File): Promise<string>;
    imguser(idimge: any): Promise<any[]>;
    insertphotoProd(name_prod: number, id_user: number, type: number, images: Express.Multer.File[]): Promise<string>;
    imgproduc(idimge: any): Promise<any[]>;
    insertphotoDriver(id_deliv: number, code_deliv: number, name_deliv: string, type_com: number, id_company: string, image: Express.Multer.File): Promise<any>;
    imgdriver(idimge: any): Promise<any[]>;
    insertphotoUserfixedup(id_user: number, type: number, image: Express.Multer.File): Promise<any>;
    insertphotoMarket(id_user: number, image: Express.Multer.File): Promise<any>;
}
