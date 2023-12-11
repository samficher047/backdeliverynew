import { OrderCodes_Service } from 'src/order_codes/orderCodes.service';

import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { datesOrder, NewOrderCode } from './orderCodes.types';

@Controller('codesOrder')
export class OrderCodes_Controller {
  constructor(private SerServiceOrders: OrderCodes_Service) {}

@Post('createCode')  
public async create (
    @Body() validateorder: NewOrderCode): 
    Promise<string> {
  const result = await this.SerServiceOrders.createOrderCode(validateorder);
  ;
  return result;
}

@Post('validOrder')  
public async events(
    @Body() validateorder: datesOrder): 
    Promise<string> {
  const result = await this.SerServiceOrders.getValidOrder(validateorder);

  return result;
}


}
