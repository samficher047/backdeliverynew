import axios from 'axios';
import * as querystring from 'querystring';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShippingDHLService {
  async gettoken() {
    try {
      const username = 'e45iG9fzB5oela7LxDIEOuQ7bgcJD5N4';
      const  password = 'xzA6QXRUb15g17UG';
      
      const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

      const response = await axios.get(
        'https://apigateway-sandbox.bluedart.com/in/transportation/token/v1/login',
        {
          headers: {
            Authorization: authHeader
          }
        },
      );
    //   console.log(response.data['JWTToken']);
      const result = response.data['JWTToken'];

      return result;
    } catch (error) {}
  }

}
