import { Body, Controller, Get, Post, Query, UploadedFile,UploadedFiles, UseInterceptors } from "@nestjs/common"

import { datausersServices } from "./infousers.service";
import { dataUsers, dataAddresUser } from "./infousers.types"

const rutefiles = 'files/files'

@Controller("dataUsers")
export class dataUsersController {
  constructor(private setServicesdataUsers: datausersServices) {}
  
  @Post("/insertNew")
  public async postnewuser(@Body() datausers: dataUsers ): Promise<string> {
    console.log('entro a controlador ')
    const result = await this.setServicesdataUsers.insertinfo(datausers);

    console.log('respuesta de insert')
    console.log(result)
    return result;
  }

  @Post("/addAddress")
  public async addNewAddres(@Body() dataAddresUser: dataAddresUser ): Promise<string> {
    console.log('entro a controlador')
    const result = await this.setServicesdataUsers.add_Address(dataAddresUser);

    console.log('respuesta de insert')
    console.log(result)
    
    return result;
  }
}

