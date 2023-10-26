import { entityimages1 } from 'src/images/entities/images.entity';
import { entityimagesUser } from 'src/images/entities/imagesUsers.entity'
import { Repository, getRepository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(entityimages1)
    private readonly conectimages1: Repository<entityimages1>,
    @InjectRepository(entityimagesUser)
    private readonly connectimages2: Repository<entityimagesUser>,
  ) {}

  async infoimg(idimge): Promise<any> {
    console.log('entro a servicio de prueba');
    console.log(idimge);
    const datosbase1 = await this.conectimages1.find({
      where: {
        id_img: idimge,
      },
    });

    return datosbase1;
  }

  async insertReg(name, filename, path, size, originalname ): Promise<any> {
    const resultEntities = [];
    const datosbase2 = this.conectimages1.create({
      rute: path,
    });
    await datosbase2.save();
    resultEntities.push(datosbase2);

    console.log(
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos mandados a tabla>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    );
    console.log(datosbase2);

    return datosbase2;
  }
 
  async insertRegUser(id_user, filename, path, size, originalname, type ): Promise<any> {
    const resultEntities = [];
    const datosbase2 = this.connectimages2.create({
      id_imgUser: id_user,
      originalName: originalname,
    filename: filename,
    rute: path,
    size: size,
    id_user: id_user,
    type_user: type,
    });
    await datosbase2.save();
    resultEntities.push(datosbase2);

    console.log(
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos mandados a tabla>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    );
    console.log(datosbase2);

    return datosbase2;
  }

  async infoimgUser(idimge): Promise<any> {
    console.log('entro a servicio de prueba');
    console.log(idimge);
    const datosbase1 = await this.connectimages2.find({
      where: {
        id_imgUser: idimge,
      },
    });

    return datosbase1;
  }
}
