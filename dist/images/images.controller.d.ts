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
}
