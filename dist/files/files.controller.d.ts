/// <reference types="multer" />
import { FilesServices } from "./files.service";
export declare class filesController {
    private setServicesFiles;
    constructor(setServicesFiles: FilesServices);
    setinfoHotel(Numcase: any): Promise<string>;
    insertphoto(date: string, file: Express.Multer.File): Promise<any>;
    insertfiles(date: string, files: Express.Multer.File[]): Promise<any>;
    setfilesforuser(Numcase: any): Promise<string>;
    deletefile(Numcase: any): Promise<string>;
}
