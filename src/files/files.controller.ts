import { diskStorage } from "multer";
import path, { extname } from 'path';

import { Body, Controller, Get, Post, Query, UploadedFile,UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { FilesServices } from "./files.service";

const rutefiles = 'files/files'

@Controller("files")
export class filesController {
  constructor(private setServicesFiles: FilesServices) {}
  

  @Post("/infotest")
  public async setinfoHotel(@Query("id") Numcase): Promise<string> {
    const result = await this.setServicesFiles.infoFiles(Numcase);
    return result;
  }

  //up file
 
  @Post('/upfile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: rutefiles,
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  public async insertphoto(
    @Body('date') date: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    if (!date || !file) {
      return 'Faltan datos requeridos.';
    }

    // console.log('Datos a insertar:');
    // console.log(date);
    // console.log(file);

    const resultInsert = await this.setServicesFiles.insertReg(
      date,
      file.originalname,
      file.filename,
      rutefiles,
    );

    // console.log(resultInsert)

    return resultInsert;
  }

  @Post('/upfiles')
@UseInterceptors(
  FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: rutefiles,
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }),
)
public async insertfiles(
  @Body('data') date: string,
  @UploadedFiles() files: Express.Multer.File[],
): Promise<any> {
  if (!date || !files || files.length === 0) {
    return 'Faltan datos requeridos o archivos.';
  }

  const resultsInsert = await Promise.all(
    files.map(async (file) => {
      const resultInsert = await this.setServicesFiles.insertReg(
        date,
        file.originalname,
        file.filename,
        rutefiles,
      );
      return resultInsert;
    }),
  );

  // console.log(resultsInsert);

  return resultsInsert;
}

@Get("/infofilesforuser")
  public async setfilesforuser(
    @Query("id") Numcase
    ): Promise<string> {
    const result = await this.setServicesFiles.infofilesofUser(Numcase);
    return result;
  }

  @Get("/deletefile")
  public async deletefile(
    @Query("id") Numcase
    ): Promise<string> {
    const result = await this.setServicesFiles.deletefile(Numcase);
    return result;
  }

}

