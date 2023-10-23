import { Store } from '../../store/entities/store.entity';
export declare class HoursOperation {
    id: number;
    day: number;
    open: string;
    close: string;
    timeZone: number;
    store: Store;
}
