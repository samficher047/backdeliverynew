import axios from 'axios';
import e from 'express';
import * as querystring from 'querystring';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { orderCodes } from './entities/orders.entity';
import { datesOrder, updateInfoSec } from './orderCodes.types';

@Injectable()
export class OrderCodes_Service {
  constructor(
    @InjectRepository(orderCodes)
    private readonly setOrderCodes: Repository<orderCodes>,
  ) {}

//   async GenerateCode(idUsers): Promise<any> {
//     function convertirAAlfanumerico(numero: number, longitud: number): string {
//       // Convertir el número a cadena
//       const cadenaNumerica = idUsers.toString();

//       // Calcular la longitud adicional necesaria
//       const longitudAdicional = longitud - cadenaNumerica.length;

//       // Generar caracteres alfanuméricos aleatorios para completar la longitud
//       const caracteresAleatorios = Array.from(
//         { length: longitudAdicional },
//         () => Math.random().toString(36).charAt(2),
//       );

//       // Concatenar el número convertido y los caracteres aleatorios
//       const codigoAlfanumerico = cadenaNumerica + caracteresAleatorios.join('');

//       return codigoAlfanumerico;
//     }

//     // Ejemplo de uso con el valor 5 y longitud 6
//     const digito = 5;
//     const codigoResultado = convertirAAlfanumerico(digito, 6);

//     console.log(codigoResultado);

//     const datosbd = this.setOrderCodes.create({
//       id_user: idUsers, // Asumo que id_user es el campo correcto según tu definición de entidad
//       code: codigoResultado,
//     });
//     await datosbd.save();

//     return datosbd;
//   }

//   async getInfoUsers(idUsers): Promise<any> {
//     console.log('idUsers');
//     console.log(idUsers);

//     try {
//       const datosbase1 = await this.setOrderCodes.find({
//         where: {
//           id_user: idUsers,
//         },
//       });
//       return datosbase1;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async updateInfoUser(SendRequest: updateInfo): Promise<any> {
//     const datosbase1 = await this.setOrderCodes.update(
//       { id_user: SendRequest.id_user },
//       {
//         id_company: SendRequest.id_compani,
//       },
//     );
//     console.log('datosbase1=>');
//     console.log(datosbase1);
//     return datosbase1;
//   }

//   async unionUsers(SendRequest: updateInfoSec): Promise<any> {
//     interface InfoUnionItem {
//       id: number;
//       name: string;
//       code: string;
//     }

//     const datosbase1 = await this.setOrderCodes.find({
//       where: {
//         id_company: SendRequest.id_compani,
//       },
//     });
//     // let infobase2 = [];

//     const promises = datosbase1.map(async (item) => {
//       return await this.setinfopri.find({
//         where: {
//           id: item.id_user,
//         },
//       });
//     });

//     const infobase2Array = await Promise.all(promises);

//     // Concatenar los resultados en ResultArray
//     const ResultArray = [].concat(...infobase2Array);

//     const InfoUnion: InfoUnionItem[] = datosbase1.map((item) => ({
//       id: item.id_user,
//       name:
//         ResultArray.find((user) => user.id === item.id_user)?.fullName || '',
//       code: item.code,
//     }));

//     console.log('InfoUnion:');
//     console.log(InfoUnion);

//     return InfoUnion;
//   }

  async getValidOrder(validateorder: datesOrder): Promise<any> {
    console.log('shared information=> ');
    console.log(validateorder.code);
    console.log(validateorder.id_order);

    try {
      const datosbase1 = await this.setOrderCodes.find({
        where: {
            id_order: validateorder.id_order,
            code: validateorder.code,
        },
      });
      if(datosbase1.length == 1){
        return true
      }

      return false;
      
    } catch (error) {
      console.log(error);
    }
  }

  
}
