import { LandingDataService } from 'src/landingpage/landingpage.service';
import { landingdataInt } from './landingdata.types';
import { landingdata } from './entities/landingdata.entity';
export declare class LandingDataController {
    private LandingData;
    constructor(LandingData: LandingDataService);
    generateCode(data: landingdataInt): Promise<landingdata>;
}
