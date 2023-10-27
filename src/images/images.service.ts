import { entityimagesDealers } from 'src/images/entities/dealers.entity'
import { entityimages1 } from 'src/images/entities/images.entity';
import { entityimagesUser } from 'src/images/entities/imagesUsers.entity'
import { entityimagesProduc } from 'src/images/entities/imgProduc.entity'
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
    @InjectRepository(entityimagesProduc)
    private readonly connectImgProduc: Repository<entityimagesProduc>,
    @InjectRepository(entityimagesDealers)
    private readonly connectImgDeal: Repository<entityimagesDealers>,
    
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

  async insertRegProduc(name_prod, originalName, filename, rute, size, id_user, type_user, key_group ): Promise<any> {
    const resultEntities = [];
    const datosbase2 = this.connectImgProduc.create({
      name_prod: name_prod,
      originalName: originalName,
    filename: filename,
    rute: rute,
    size: size,
    id_user: id_user,
    type_user: type_user,
    key_group: key_group,
    });
    await datosbase2.save();
    resultEntities.push(datosbase2);

    console.log(
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos mandados a tabla>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    );
    console.log(datosbase2);

    return datosbase2;
  }

  async infoimgProduc(idimge): Promise<any> {
    console.log('entro a servicio de prueba');
    console.log(idimge);
    const datosbase1 = await this.connectImgProduc.find({
      where: {
        id_imgProduc: idimge,
       
      },
    });

    return datosbase1;
  }
  async infoimgProduc2(idimge): Promise<any> {
    console.log('entro a servicio de prueba');
    console.log(idimge);
    const datosbase1 = await this.connectImgProduc.find({
      where: {
        key_group: idimge,
       
      },
    });

    return datosbase1;
  }

  // crud repartidor 
  async insertRegDeal(id_deliv, code_deliv, name_deliv, namefile, name_original, rute, size, id_company, type_com ): Promise<any> {
    const resultEntities = [];
    const datosbase2 = this.connectImgDeal.create({
    id_deliv: id_deliv,
    code_deliv: code_deliv,
    name_deliv: name_deliv,
    namefile: namefile,
    name_original: name_original,
    rute: rute,
    size: size,
    id_company: id_company,
    type_com: type_com,
    });
    await datosbase2.save();
    resultEntities.push(datosbase2);

    console.log(
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos mandados a tabla>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    );
    console.log(datosbase2);

    return datosbase2;
  }

  async infoimgDeal(idimge): Promise<any> {
    console.log('entro a servicio de prueba');
    console.log(idimge);
    const datosbase1 = await this.connectImgDeal.find({
      where: {
        id_imgDealers: idimge,
      },
    });

    return datosbase1;
  }
}
