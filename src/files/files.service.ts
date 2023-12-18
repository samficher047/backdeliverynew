import { entityimagesDealers } from 'src/images/entities/dealers.entity';
import { entityimages1 } from 'src/images/entities/images.entity';
import { entityimagesUser } from 'src/images/entities/imagesUsers.entity';
import { entityimagesProduc } from 'src/images/entities/imgProduc.entity';
import { Repository, getRepository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { typefiles } from './entities/files.entity'

@Injectable()
export class FilesServices {
  constructor(
    @InjectRepository(typefiles)
    private readonly setfiles: Repository<typefiles>,
  ) {}

  async infoFiles(idimge): Promise<any> {
    console.log('entro a servicio de prueba');
    console.log(idimge);
    const datosbase1 = await this.setfiles.find({
      where: {
        id_files: idimge,
      },
    });

    return datosbase1;
  }

  async insertReg(id_user, namefile, newname, rutefile): Promise<any> {
    const resultEntities = [];
    const datosbase2 = this.setfiles.create({
      id_user: id_user,
      origin_name_file: namefile,
      new_name_file: newname,
      rute: rutefile,
    });
    await datosbase2.save();
    resultEntities.push(datosbase2);

    return datosbase2;
  }

  async infofilesofUser(iduser): Promise<any> {
   
    const datosbase1 = await this.setfiles.find({
      where: {
        id_user: iduser,
      },
    });

    return datosbase1;
  }

  async deletefile(data): Promise<any> {
   
    const datosbase1 = await this.setfiles.delete({
        id_files: data,
    });

    return datosbase1;
  }

}
