import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import * as querystring from 'querystring';
import { Datalabel, Datasend, FedExRequest } from './shippingpackages.types';

@Injectable()
export class ShippingPackagesService {
  async gettoken() {
    try {
      const parametros = {
        grant_type: 'client_credentials',
        client_id: 'l79776518c5fcd4eaa90a3deb4e7f9c28d',
        client_secret: '6b10fef0164041319cd4ca7515d682f1',
      };

      const parametrosCodificados = querystring.stringify(parametros);

      const response = await axios.post(
        'https://apis-sandbox.fedex.com/oauth/token',
        parametrosCodificados,
        {
          headers: {
            ContentType: 'application/x-www-form-urlencoded',
          },
        },
      );

      console.log(response.data['access_token']);

      const result = response.data['access_token'];

      return result;
    } catch (error) {}
  }

  async getquotes() {
    try {
      const username = 'TukmeinLLC_apiuser';
      const password = 'IMCpW-{Qe|';

      // Codifica las credenciales en base64
      const token = Buffer.from(`${username}:${password}`, 'utf8').toString(
        'base64',
      );

      // Realiza la petición GET con la cabecera de autenticación Basic Auth
      const response = await axios.get(
        'https://api.preview.autoprocessor.com/V03/ApexInventoryService/DownloadCategories?PageNumber=1&IncludeInactive=true',
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      );

      console.log(response.data['Data']);

      const result = response.data['Data'];

      return result;
    } catch (error) {}
  }

  async newrate(SendRequest: Datasend) {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXV0aDB8NjBmODY4YTMzYTgzYTgwMDcwYjA0YjQwIiwidmlwIjpmYWxzZSwibmFtZSI6Ikp1bGlvIEdhcnphIiwiZW1haWwiOiJqZ2FyemFAZXFodW1hLmNvbSIsImlhdCI6MTYzNDk0MDg3M30.A3tV2Yp9tcDOIC59hwGhCHk60UVR6ihGh6p1Hi7K3uo';

      const response = await axios.post(
        'https://sandbox.api-drenvio.com/v2/shipments/rate',
        SendRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido como JSON
          },
        },
      );

      console.log(response.data);

      const result = response.data;

      return result;
    } catch (error) {}
  }

  async newratefedex(FedExRequest: FedExRequest) {
    try {
      const token = await this.gettoken();

      const response = await axios.post(
        'https://apis-sandbox.fedex.com/rate/v1/rates/quotes',
        FedExRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido como JSON
          },
        },
      );

      console.log(response.data);

      const result = [response.data];

      return result;
    } catch (error) {}
  }

  async newlabel(Datalabel: Datalabel) {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXV0aDB8NjBmODY4YTMzYTgzYTgwMDcwYjA0YjQwIiwidmlwIjpmYWxzZSwibmFtZSI6Ikp1bGlvIEdhcnphIiwiZW1haWwiOiJqZ2FyemFAZXFodW1hLmNvbSIsImlhdCI6MTYzNDk0MDg3M30.A3tV2Yp9tcDOIC59hwGhCHk60UVR6ihGh6p1Hi7K3uo';

      const response = await axios.post(
        'https://sandbox.api-drenvio.com/v2/shipments/generate',
        Datalabel,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(response.data);

      const result = response.data;

      return result;
    } catch (error) {}
  }
}
