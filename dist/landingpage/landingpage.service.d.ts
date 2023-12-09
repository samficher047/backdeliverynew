import { Repository } from 'typeorm';
import { landingdata } from './entities/landingdata.entity';
import { landingdataInt } from './landingdata.types';
export declare class LandingDataService {
    private readonly landingdata;
    constructor(landingdata: Repository<landingdata>);
    savedata(data: landingdataInt): Promise<landingdata>;
}
