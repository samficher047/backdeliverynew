import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import * as querystring from 'querystring';
import { InformationSent } from './wallet.types';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly Wallet: Repository<Wallet>,
  ) {}

  async getsaldo(idusuario) {
    try {
      const Walletget = await this.Wallet.find({
        where: {
          id_usuario: idusuario,
        },
      });

      let saldo = 0;
      let descuentos = 0;
      let total = 0;
      for (const record of Walletget) {
        if (record.flagentrada) {
          saldo += Number(record.monto);
        }
      }

      for (const record of Walletget) {
        if (record.flagsalida) {
          descuentos += Number(record.monto);
        }
      }

      console.log(saldo);
      console.log(descuentos);
      total = saldo - descuentos;

      return { saldo: saldo, descuentos: descuentos, total: total };
    } catch (error) {}
  }
  async gettransacciones(idusuario) {
    try {
      const Walletget = await this.Wallet.find({
        where: {
          id_usuario: idusuario,
        },
      });

      return Walletget;
    } catch (error) {}
  }
  async setsaldo(Informationsent: InformationSent) {
    try {
      console.log(Informationsent);
      const Walletcreate = this.Wallet.create({
        id_usuario: Informationsent.idusuario,
        monto: Informationsent.monto,
        flagentrada: Informationsent.flagentrada,
        flagsalida: Informationsent.flagsalida,
      });

      await Walletcreate.save();
      return [Walletcreate];
    } catch (error) {}
  }
}
