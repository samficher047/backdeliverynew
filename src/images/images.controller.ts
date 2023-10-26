import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from 'src/images/images.service';

import { Controller, Get, Param, Post, Body, UseInterceptors, Query, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

  @Controller('chImages')
  export class GaleryController {
    constructor(private imagesServ: ImagesService) {}
  
    @Get('/infoImg')
    public async events(@Query('id') idimge): Promise<any[]> {
      console.log('id=>')
      console.log(idimge)
      const result = await this.imagesServ.infoimg(idimge);
  
      return result;
    }

    // test insert image 
    @Post('/insertphoto')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: 'files/images1', // Directorio donde se almacenarán las imágenes
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
      @Body('name') name: string,
      @UploadedFile() image: Express.Multer.File,
    ): Promise<string> {
      if (!name || !image) {
        return 'Faltan datos requeridos.';
      }
  
      // Realiza aquí las operaciones necesarias con el nombre y la imagen, por ejemplo, guardar en la base de datos y/o mover a la ubicación deseada.
      console.log('datos a insertar: ')
      console.log(name)
      console.log(image)
      const resultInsert = await this.imagesServ.insertReg(
        name,
        image.filename,
        image.path,
        image.size,
        image.originalname
      );

      return 'Imagen subida exitosamente';
    }

    // insert user photo
    @Post('/insertphotoUser')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: 'files/users', // Directorio donde se almacenarán las imágenes
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
    public async insertphotoUser(
      @Body('iduser') id_user: number,
      @Body('type') type: number,
      @UploadedFile() image: Express.Multer.File,
    ): Promise<string> {
      if (!id_user || !image) {
        return 'Faltan datos requeridos.';
      }
  
      // Realiza aquí las operaciones necesarias con el nombre y la imagen, por ejemplo, guardar en la base de datos y/o mover a la ubicación deseada.
      console.log('datos a insertar: ')
      console.log(id_user)
      console.log(image)
      const resultInsert = await this.imagesServ.insertRegUser(
        id_user,
        image.filename,
        image.path,
        image.size,
        image.originalname,
        type
      );

      return 'Imagen subida exitosamente';
    }

    @Get('/infoImgUser')
    public async imguser(@Query('id') idimge): Promise<any[]> {
      console.log('id=>')
      console.log(idimge)
      const result = await this.imagesServ.infoimgUser(idimge);
  
      return result;
    }
}

  