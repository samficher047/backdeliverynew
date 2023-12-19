import {
  dataUsers,
  dataAddresUser,
  databilling,
  dataAddressFiscal,
} from "./infousers.types";
import { Repository, getRepository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { addressbillingEntity } from "./entities/addressbilling.entity";
import { addres_profileEntity } from "./entities/addressprofile.entity";
import { billingEntity } from "./entities/billing.entity";
import { datausersEntity } from "./entities/datausers.entity";

@Injectable()
export class datausersServices {
  constructor(
    @InjectRepository(datausersEntity)
    private readonly setdatausers: Repository<datausersEntity>,
    @InjectRepository(addres_profileEntity)
    private readonly setaddressusers: Repository<addres_profileEntity>,
    @InjectRepository(billingEntity)
    private readonly setbilling: Repository<billingEntity>,
    @InjectRepository(addressbillingEntity)
    private readonly setAddressbilling: Repository<addressbillingEntity>
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

  async postbilling(databilling: databilling): Promise<any> {
    console.log("entro a servicio de prueba");
    console.log(databilling);

    const datosbase2 = this.setbilling.create({
      id_user: databilling.id_user,
      rfc: databilling.rfc,
      type_of_person: databilling.type_of_person,
      legal_name: databilling.legal_name,
      payment_method: databilling.payment_method,
      tax_regime: databilling.tax_regime,
      name: databilling.name,
      email: databilling.email,
      phone: databilling.phone,
    });
    await datosbase2.save();

    return datosbase2;
  }

  async postAddress_billing(
    dataAddressFiscal: dataAddressFiscal
  ): Promise<any> {
    console.log("entro a servicio de prueba");
    console.log(dataAddressFiscal);

    const datosbase2 = this.setAddressbilling.create({
        id_user: dataAddressFiscal.id_user,
        street: dataAddressFiscal.street,
        neighborhood: dataAddressFiscal.neighborhood,
        number: dataAddressFiscal.number,
        num_inter: dataAddressFiscal.num_inter,
        contry_code: dataAddressFiscal.contry_code,
        city: dataAddressFiscal.city,
    });
    await datosbase2.save();

    return datosbase2;
  }

  async setlibAddress(idhotel): Promise<any> {
    
    const datosbase1 = await this.setaddressusers.find({
      where: {
        id_user: idhotel,
      },
    });

    return datosbase1;
  }

  async editAddresUser(dataAddresUser: dataAddresUser): Promise<any> {
    console.log("entro a servicio de prueba");
    console.log(dataAddresUser);

    const datosbase1 = await this.setaddressusers.update(
        { id_address: dataAddresUser.id_address },
        {
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
        },
      );

    return datosbase1;
  }
}
