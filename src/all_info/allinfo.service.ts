import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import * as querystring from 'querystring';
import { InformationSent } from './allinfo.types';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { userexist } from 'src/users_codes/entities/users.entity';

@Injectable()
export class allinfoService {
  constructor(
    @InjectRepository(Wallet)
    private readonly Wallet: Repository<Wallet>,
    @InjectRepository(userexist)
    private readonly userexist: Repository<userexist>,
  ) {}

  async getinfouser(idusuario) {
    try {
      const Walletget = await this.userexist.find({
        where: {
          id: idusuario,
        },
      });

      return Walletget[0];
    } catch (error) {}
  }
  // async gettransacciones(idusuario) {
  //   try {
  //     const Walletget = await this.Wallet.find({
  //       where: {
  //         id_usuario: idusuario,
  //       },
  //     });

  //     return Walletget;
  //   } catch (error) {}
  // }
  // async setsaldo(Informationsent: InformationSent) {
  //   try {
  //     console.log(Informationsent);
  //     const Walletcreate = this.Wallet.create({
  //       id_usuario: Informationsent.idusuario,
  //       monto: Informationsent.monto,
  //       flagentrada: Informationsent.flagentrada,
  //       flagsalida: Informationsent.flagsalida,
  //     });

  //     await Walletcreate.save();
  //     return [Walletcreate];
  //   } catch (error) {}
  // }
}
