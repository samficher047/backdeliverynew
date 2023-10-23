import { PaginationDto } from "src/common/dto/pagination.dto";
import { Location } from "src/common/interfaces/location.interface";
import { Store } from '../../../admin/store/entities/store.entity';
export declare class OrderMarketDto extends PaginationDto {
    store: Store;
    note: string;
    deliveryFee: number;
    total: number;
    address: string;
    products: JSON;
    location: Location;
    orderedAt: Date;
    payment: number;
}
