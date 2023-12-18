import { Repository, getRepository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { addres_profileEntity } from "./entities/addressprofile.entity"
import { datausersEntity } from "./entities/datausers.entity";
import { dataUsers, dataAddresUser } from "./infousers.types";

@Injectable()
export class datausersServices {
  constructor(
    @InjectRepository(datausersEntity)
    private readonly setdatausers: Repository<datausersEntity>,
    @InjectRepository(addres_profileEntity)
    private readonly setaddressusers: Repository<addres_profileEntity>,
  ) {}

  async insertinfo(dataUsers: dataUsers): Promise<any> {
    console.log("entro a servicio de prueba");
    console.log(dataUsers);
    const datosbase2 = this.setdatausers.create({
      id_user: dataUsers.id_user,
      name: dataUsers.name,
      lastname: dataUsers.lastname,
      email: dataUsers.email,
      phone: dataUsers.phone,
      birthdate: dataUsers.birthdate,
      gender: dataUsers.gender,
    });
    await datosbase2.save();

    return datosbase2;
  }

  async add_Address(dataAddresUser: dataAddresUser): Promise<any> {

    console.log("entro a servicio de prueba");
    console.log(dataAddresUser);

    const datosbase2 = this.setaddressusers.create({
        id_user: dataAddresUser.id_user,
        country: dataAddresUser.country,
        state: dataAddresUser.state,
        city: dataAddresUser.city,
        contry_code: dataAddresUser.contry_code,
        delegation: dataAddresUser.delegation,
        street: dataAddresUser.street,
        number: dataAddresUser.number,
        interior_num: dataAddresUser.interior_num,
        type: dataAddresUser.type,
        reference: dataAddresUser.reference,
    });
    await datosbase2.save();

    return datosbase2;
  }

}
