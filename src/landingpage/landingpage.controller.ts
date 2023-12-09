import { LandingDataService } from 'src/landingpage/landingpage.service';

import { Body, Controller, Post } from '@nestjs/common';
import { landingdataInt } from './landingdata.types';
import { landingdata } from './entities/landingdata.entity';

@Controller('LandingData')
export class LandingDataController {
  constructor(private LandingData: LandingDataService) {}

  @Post('/generateCod')
  public async generateCode(
    @Body() data: landingdataInt,
  ): Promise<landingdata> {
    const result = await this.LandingData.savedata(data);
    return result;
  }
}
