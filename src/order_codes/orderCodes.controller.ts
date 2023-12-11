import { OrderCodes_Service } from 'src/order_codes/orderCodes.service';

import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { datesOrder, updateInfoSec } from './orderCodes.types';

@Controller('codesOrder')
export class OrderCodes_Controller {
  constructor(private SerServiceOrders: OrderCodes_Service) {}

//   @Get('/generateCod')
//   public async generateCode(@Query('id_user') IdUser): Promise<string> {
//     const result = await this.infoUsers.GenerateCode(IdUser);
//     // console.log('result');
//     // console.log(result);
//     return result;
//   }

@Post('validOrder')
public async events(
    @Body() validateorder: datesOrder): 
    Promise<string> {
  const result = await this.SerServiceOrders.getValidOrder(validateorder);
  console.log("console info in controller=>");
  console.log(result);
  return result;
}
//   @Get('/UpdateUser')
//   public async updateUser(@Query() SendRequest: updateInfo): Promise<string> {
//     const result = await this.infoUsers.updateInfoUser(SendRequest);
//     console.log(result);
//     return result;
//   }

//   @Get('/setunionUsers')
//   public async setUnionUser(
//     @Query() SendRequest: updateInfoSec,
//   ): Promise<string> {
//     const result = await this.infoUsers.unionUsers(SendRequest);
//     // console.log(result);
//     return result;
//   }
}
