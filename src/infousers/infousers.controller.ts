import { Body, Controller, Get, Post, Query, UploadedFile,UploadedFiles, UseInterceptors } from "@nestjs/common"

import { datausersServices } from "./infousers.service";
import { dataUsers, dataAddresUser, databilling, dataAddressFiscal } from "./infousers.types"

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

  @Post("/addDatabilling")
  public async addBilling(@Body() databilling: databilling ): Promise<any> {
    console.log('entro a controlador')

    const result = await this.setServicesdataUsers.postbilling(databilling);

    console.log('respuesta de insert')
    console.log(result)
    
    return result;
  }

  @Post("/addresfiscal")
  public async addaddressfiscal(@Body() dataAddressFiscal: dataAddressFiscal ): Promise<any> {
    console.log('entro a controlador')

    const result = await this.setServicesdataUsers.postAddress_billing(dataAddressFiscal);

    console.log('respuesta de insert')
    console.log(result)
    
    return result;
  }

  @Get("/addresfiscal")
  public async setlibAddress(
    @Query('iduser') iduser 
  
  ): Promise<any> {
    console.log('entro a controlador de select')

    const result = await this.setServicesdataUsers.setlibAddress(iduser);

    console.log('respuesta de insert')
    console.log(result)
    
    return result;
  }

  @Post("/editAddress")
  public async editAddresUser(@Body() dataAddresUser: dataAddresUser ): Promise<string> {
    console.log('entro a controlador')
    const result = await this.setServicesdataUsers.editAddresUser(dataAddresUser);

    console.log('respuesta de insert')
    console.log(result)
    
    return result;
  }

  @Get("/deleteAddress")
  public async DeleteAddress(
    @Query('idAdds') iduser 
  
  ): Promise<any> {

    const result = await this.setServicesdataUsers.setlibAddress(iduser);

    console.log('respuesta de insert')
    console.log(result)
    
    return result;
  }
}
