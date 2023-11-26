import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import * as querystring from 'querystring';
import {
  Datalabel,
  Datasend,
  FedExRequest,
  ShippingInfo,
} from './shippingpackages.types';

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

      //console.log(response.data['access_token']);

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
            'Content-Type': 'application/json',
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

  async allrates(SendRequest: Datasend) {
    console.log('datos recibidos');
    console.log(SendRequest.origin.postal_code);
    console.log(SendRequest.destination.postal_code);

    console.log(SendRequest.packages[0].weight);
    console.log(SendRequest.packages[0].height);
    console.log(SendRequest.packages[0].width);
    console.log(SendRequest.packages[0].length);
    console.log(SendRequest.packages[0].volumetric);
    try {
      ///
      const configGet = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api-mock.dhl.com/mydhlapi/rates?accountNumber=123456789&originCountryCode=MX&originPostalCode=64000&originCityName=Monterrey&destinationCountryCode=MX&destinationPostalCode=54610&destinationCityName=Tepotzotlán&weight=5&length=15&width=10&height=5&isCustomsDeclarable=false&unitOfMeasurement=metric&nextBusinessDay=false&strictValidation=false&getAllValueAddedServices=false&requestEstimatedDeliveryDate=true&estimatedDeliveryDateType=QDDF',
        headers: {
          Authorization: 'Basic ZGVtby1rZXk6ZGVtby1zZWNyZXQ=',
        },
      };

      /////section de Dr envio
      const dataDR = JSON.stringify({
        type: 'National',
        origin: {
          country: 'MX',
          postal_code: SendRequest.origin.postal_code,
        },
        destination: {
          country: 'MX',
          postal_code: SendRequest.destination.postal_code,
        },
        packages: [
          {
            weight: SendRequest.packages[0].weight,
            height: SendRequest.packages[0].height,
            width: SendRequest.packages[0].width,
            length: SendRequest.packages[0].length,
            volumetric: SendRequest.packages[0].volumetric,
            type: 'box',
            main_weight: 1,
          },
        ],
        carriers: [
          'fedex',
          'estafeta',
          'ampm',
          'jtexpress',
          'redpack',
          'dhl',
          'ups',
        ],
        insurance: 0,
      });

      ///////////

      const tokenfedex = await this.gettoken();

      const datafex = JSON.stringify({
        accountNumber: {
          value: '123456789',
        },
        requestedShipment: {
          packagingType: 'YOUR_PACKAGING',
          pickupType: 'DROPOFF_AT_FEDEX_LOCATION',
          requestedPackageLineItems: [
            {
              weight: {
                units: 'LB',
                value: 30,
              },
              dimensions: {
                length: 15,
                width: 15,
                height: 15,
                units: 'IN',
              },
              packageSpecialServices: {
                batteryDetails: [
                  {
                    material: 'LITHIUM_ION',
                    packing: 'PACKED_WITH_EQUIPMENT',
                    regulatorySubType: 'IATA_SECTION_II',
                  },
                ],
              },
            },
            {
              weight: {
                units: 'LB',
                value: 30,
              },
              dimensions: {
                length: 15,
                width: 15,
                height: 15,
                units: 'IN',
              },
              packageSpecialServices: {
                batteryDetails: [
                  {
                    material: 'LITHIUM_ION',
                    packing: 'PACKED_WITH_EQUIPMENT',
                    regulatorySubType: 'IATA_SECTION_II',
                  },
                ],
              },
            },
          ],
          rateRequestType: ['ACCOUNT'],
          shipper: {
            address: {
              city: 'Tamarac',
              stateOrProvinceCode: 'FL',
              postalCode: '33321',
              countryCode: 'US',
              residential: false,
            },
          },
          recipient: {
            address: {
              city: 'Miramar',
              stateOrProvinceCode: 'FL',
              postalCode: '33025',
              countryCode: 'US',
              residential: false,
            },
          },
        },
      });

      const configFedEx = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apis-sandbox.fedex.com/rate/v1/rates/quotes',
        headers: {
          'X-locale': 'en_US',
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenfedex}`,
          Cookie:
            'ak_bmsc=8C023C2E49F410E036B41FCB7C90B455~000000000000000000000000000000~YAAQBcVXuJiG7NGLAQAAz1z3CBV66vZPIl9GvdnY3OAuLINDoGySnGqW1Tl38w3LyKAWQVu0G6ciU4+MkZdmvlse54oWuDD5MM7HEBSVckOeHWszZxHkySE1Ttmv7qcylE/klohdUm5VJ1fNjkIpEhOaBge2gN3bhUEMtlJCEokDmPd08NTCC0DL3M20abTxlBCMhkcq06bAe8sq8VCX5Fyq/rUXf2JHZD7LsmiRQQrR/9JG4B2CQs+yDJPnCd40s55353EBKrwt2T350BOSkIVYkt1IvcUSV3My+gGNhQTX+fKJDXCe2feIyJMQyi3gzT14A1VVf95xFD3QxN9QuYy0WM7eXvnkU7AH/lo97UvIOKns+nBBsWLopDws; bm_sv=0940668AC01540A67731F6A1B8154236~YAAQBcVXuPmN7NGLAQAAf+j3CBXSKRG+ODZBL/V3IvbNveK4GDa7ndF6ODj0CkrNXSjMoYZacEWSM6MrLSpj/hMch71Cwfy6BLX1iDI5Y7xxkQq3a80GwQlv1XephhV6GXQmZeS1Ftxg0/4OA6GllvE3mU4Lt4IkH6/6J6cjjOAK5XbDM+Q3l+UmHlwLgQQy9dpQvr4s8PVlCUMF1ZbhGJjILxTAigVeMJA0B2YgPk3UWo+6AzCiirmkANmvWUc=~1',
        },
        data: datafex,
      };

      ////////////
      //desarrollo
      // const token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXV0aDB8NjBmODY4YTMzYTgzYTgwMDcwYjA0YjQwIiwidmlwIjpmYWxzZSwibmFtZSI6Ikp1bGlvIEdhcnphIiwiZW1haWwiOiJqZ2FyemFAZXFodW1hLmNvbSIsImlhdCI6MTYzNDk0MDg3M30.A3tV2Yp9tcDOIC59hwGhCHk60UVR6ihGh6p1Hi7K3uo';
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXV0aDB8NjBmODY4YTMzYTgzYTgwMDcwYjA0YjQwIiwidmlwIjpmYWxzZSwibmFtZSI6Ikp1bGlvIEdhcnphIiwiZW1haWwiOiJqZ2FyemFAZXFodW1hLmNvbSIsImlhdCI6MTY2MzEwODk4OX0.PgIYIFOcUbKP-unaNJGbHofFdGTMnKZ7x5Khjmjokdo';
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const promise1 = axios.post(
        'https://api-clientes.vercel.app/v2/shipments/rate',
        dataDR,
        { headers },
      );
      //
      const promise2 = axios.request(configGet);

      const promise3 = axios.request(configFedEx);

      // Ejecutar las tres llamadas en paralelo
      const [response1, response2, response3] = await Promise.all([
        promise1,
        promise2,
        promise3,
      ]);

      //const [response1] = await Promise.all([promise1]);

      // Aquí puedes manejar las respuestas como prefieras
      console.log(response1.data.length);
      console.log(response2.data['products'][0]['totalPrice']);
      console.log(response2.data['products'][0]['productName']);
      // console.log(response3.data);

      const shippingArray: ShippingInfo[] = [];

      for (let i = 0; i < response1.data.length; i++) {
        console.log(response1.data[i]['ShippingId']);

        // // n es el número de veces que quieres repetir el proceso
        const shippingInfo: ShippingInfo = {
          provehdor: 'DRenvio',
          provehdorid: '1',
          ObjectId: response1.data[i]['ObjectId'],
          ShippingId: response1.data[i]['ShippingId'],
          service_id: response1.data[i]['service_id'],
          carrier: response1.data[i]['carrier'],
          currency: response1.data[i]['currency'],
          days: response1.data[i]['days'],
          price: response1.data[i]['price'],
          insurance: response1.data[i]['insurance'],
          service: response1.data[i]['service'],
          metadata: {
            extended_area: {
              extended_area: false,
              origin: false,
              destination: false,
            },
          },
        };

        shippingArray.push(shippingInfo);
      }

      const shippingInfo2: ShippingInfo = {
        provehdor: 'DHL',
        provehdorid: '2',
        ObjectId: 'DHL',
        ShippingId: 'DHL',
        service_id: 'DHL',
        carrier: 'DHL',
        currency: 'MXN',
        days: response2.data['products'][0]['deliveryCapabilities'][
          'totalTransitDays'
        ],
        price: response2.data['products'][0]['totalPrice'][0]['price'],
        insurance: 0,
        service: response2.data['products'][0]['productName'],
        metadata: {
          extended_area: {
            extended_area: false,
            origin: false,
            destination: false,
          },
        },
      };

      shippingArray.push(shippingInfo2);

      for (
        let i = 0;
        i < response3.data['output']['rateReplyDetails'].length;
        i++
      ) {
        const shippingInfo: ShippingInfo = {
          provehdor: 'FEDEX',
          provehdorid: '3',
          ObjectId: 'FEDEX',
          ShippingId: 'FEDEX',
          service_id:
            response3.data['output']['rateReplyDetails'][i][
              'serviceDescription'
            ]['serviceId'],
          carrier: 'FEDEX',
          currency: response3.data['output']['rateReplyDetails'][i]['currency'],
          days: response3.data['output']['rateReplyDetails'][i]['serviceType'],
          price:
            response3.data['output']['rateReplyDetails'][i][
              'ratedShipmentDetails'
            ][0]['totalNetFedExCharge'],
          insurance: 0,
          service:
            response3.data['output']['rateReplyDetails'][i]['serviceName'],
          metadata: {
            extended_area: {
              extended_area: false,
              origin: false,
              destination: false,
            },
          },
        };

        shippingArray.push(shippingInfo);
      }

      return shippingArray;
    } catch (error) {
      // Manejar el error
      console.error(error);
    }
  }
}
