import { users_CodesService } from 'src/users_codes/usersCodes.service';

import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { updateInfo, updateInfoSec } from './usersCodes.types';

@Controller('users_Codes')
export class users_Codes_Controller {
  constructor(private infoUsers: users_CodesService) {}

  @Get('/generateCod')
  public async generateCode(@Query('id_user') IdUser): Promise<string> {
    const result = await this.infoUsers.GenerateCode(IdUser);
    // console.log('result');
    // console.log(result);
    return result;
  }

  @Get('/infoUser')
  public async events(@Query('id_user') IdUser): Promise<string> {
    const result = await this.infoUsers.getInfoUsers(IdUser);
    console.log(result);
    return result;
  }
  @Get('/UpdateUser')
  public async updateUser(@Query() SendRequest: updateInfo): Promise<string> {
    const result = await this.infoUsers.updateInfoUser(SendRequest);
    console.log(result);
    return result;
  }

  @Get('/setunionUsers')
  public async setUnionUser(
    @Query() SendRequest: updateInfoSec,
  ): Promise<string> {
    const result = await this.infoUsers.unionUsers(SendRequest);
    // console.log(result);
    return result;
  }
}
