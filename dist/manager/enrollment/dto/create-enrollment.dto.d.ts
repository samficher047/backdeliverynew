import { Location } from 'src/common/interfaces/location.interface';
export declare class CreateEnrollmentDto {
    name: string;
    address: string;
    image: string;
    marker: string;
    contact: string;
    email: string;
    location: Location;
    categoryId: number;
    userId: number;
}
