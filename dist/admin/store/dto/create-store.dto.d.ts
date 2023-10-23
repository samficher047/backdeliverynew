import { Location } from "src/common/interfaces/location.interface";
import { Company } from '../../company/entities/company.entity';
export declare class CreateStoreDto {
    name: string;
    address: string;
    contact: string;
    email: string;
    location: Location;
    company: Company;
}
