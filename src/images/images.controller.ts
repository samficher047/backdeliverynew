import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from 'src/images/images.service';

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  Query,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('chImages')
export class GaleryController {
  constructor(private imagesServ: ImagesService) {}

  @Get('/infoImg')
  public async events(@Query('id') idimge): Promise<any[]> {
    console.log('id=>');
    console.log(idimge);
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
    console.log('datos a insertar: ');
    console.log(name);
    console.log(image);
    const resultInsert = await this.imagesServ.insertReg(
      name,
      image.filename,
      image.path,
      image.size,
      image.originalname,
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
    console.log('datos a insertar: ');
    console.log(id_user);
    console.log(image);
    const resultInsert = await this.imagesServ.insertRegUser(
      id_user,
      image.filename,
      image.path,
      image.size,
      image.originalname,
      type,
    );

    return 'Imagen subida exitosamente';
  }

  @Get('/infoImgUser')
  public async imguser(@Query('id') idimge): Promise<any[]> {
    console.log('id=>');
    console.log(idimge);
    const result = await this.imagesServ.infoimgUser(idimge);

    return result;
  }

  //// // insert produc photo
  @Post('/insertphotoProd')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: 'files/produc',
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
  public async insertphotoProd(
    @Body('namProd') name_prod: number,
    @Body('iduser') id_user: number,
    @Body('type') type: number,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<string> {
    if (!images || images.length === 0) {
      return 'Faltan datos requeridos.';
    }

    // Realiza aquí las operaciones necesarias con el nombre y la imagen, por ejemplo, guardar en la base de datos y/o mover a la ubicación deseada.
    console.log('datos a insertar: ');
    console.log(id_user);
    console.log(images);

    let keyGroup = 0; // Inicializa la variable keyGroup en 0

    for (let i = 0; i < images.length; i++) {
      const dat = images[i];
      const resultInsert = await this.imagesServ.insertRegProduc(
        name_prod,
        dat.originalname,
        dat.filename,
        dat.path,
        dat.size,
        id_user,
        type,
        keyGroup,
      );

      if (i === 0 && resultInsert.id_imgProduc) {
        keyGroup = resultInsert.id_imgProduc; // Actualiza keyGroup solo en la primera iteración
      }
    }
    return 'Imagen subida exitosamente';
  }

  @Get('/infoImgProdus')
  public async imgproduc(@Query('id') idimge): Promise<any[]> {
    console.log('id=>');
    console.log(idimge);
    const result = await this.imagesServ.infoimgProduc(idimge);
    const result2 = await this.imagesServ.infoimgProduc2(idimge);
    const info = [].concat(...result, ...result2);
    return info;
  }

  /////  insert photo driver

  @Post('/insertphotoDriver')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'files/driver', // Directorio donde se almacenarán las imágenes
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
  public async insertphotoDriver(
    @Body('idDrive') id_deliv: number,
    @Body('code') code_deliv: number,
    @Body('name') name_deliv: string,
    @Body('type') type_com: number,
    @Body('idCompan') id_company: string,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    if (!image) {
      return 'Faltan datos requeridos.';
    }

    // Realiza aquí las operaciones necesarias con el nombre y la imagen, por ejemplo, guardar en la base de datos y/o mover a la ubicación deseada.
    console.log('datos a insertar: ');
    // console.log(id_user)
    // console.log(image)
    const rute = '/images/driver/' + image.filename;
    const info = [];

    const resultInsert = await this.imagesServ.insertRegDeal(
      id_deliv,
      code_deliv,
      name_deliv,
      image.filename,
      image.originalname,
      rute,
      image.size,
      id_company,
      type_com,
    );

    console.log(image.filename);
    const item = {
      id_regis: resultInsert.id_imgDealers,
      rute: rute, // Asignar la ruta
    };
    info.push(item);

    return item;
  }

  @Get('/infoImgDriver')
  public async imgdriver(@Query('id') idimge): Promise<any[]> {
    console.log('id=>');
    console.log(idimge);
    const result = await this.imagesServ.infoimgDeal(idimge);

    // console.log("result.rute=>")
    // console.log(result[0].rute)

    const originalPath = result[0].rute;

    console.log('modifiedPath=>');

    const parts = originalPath.split('\\');

    const modifiedPath = '/' + parts.join('/');

    // Reemplazamos "files" por "images" en la cadena modificada
    const finalPath = modifiedPath.replace('/files/', '/images/');

    console.log('finalPath=>');
    console.log(finalPath);

    const modifiedResponse = result.map((item) => {
      const modifiedRute = item.rute
        .replace(/\\/g, '/')
        .replace(/^files\//, '/images/');

      return {
        ...item,
        rute: modifiedRute,
      };
    });

    console.log('modifiedResponse=>');
    console.log(modifiedResponse);

    return modifiedResponse;
  }

  @Post('/insertphotouserfixedup')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'files/users',
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
  public async insertphotoUserfixedup(
    @Body('iduser') id_user: number,
    @Body('type') type: number,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    if (!image) {
      return 'Faltan datos requeridos.';
    }

    console.log('datos a insertar: ');
    const rute = '/images/users/' + image.filename;
    const info = [];

    const resultInsert = await this.imagesServ.insertRegUser(
      id_user,
      image.filename,
      rute,
      image.size,
      image.originalname,
      type,
    );

    console.log(image.filename);
    const item = {
      id_regis: resultInsert.id_imgDealers,
      rute: rute,
    };
    info.push(item);

    return item;
  }

  @Post('/insertphotomarket')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'files/markets',
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
  public async insertphotoMarket(
    @Body('iduser') id_user: number,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    if (!image) {
      return 'Faltan datos requeridos.';
    }
    const rute = '/images/markets/' + image.filename;
    const info = [];

    const resultInsert = await this.imagesServ.insertRegMarket(
      id_user,
      image.filename,
      rute,
      image.size,
    );

    console.log(image.filename);
    const item = {
      id_regis: resultInsert.id_imgDealers,
      rute: rute,
    };
    info.push(item);

    return item;
  }
}
