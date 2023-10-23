import { User } from './user.entity';
import { Location } from "src/common/interfaces/location.interface";
export declare class Session {
    id: number;
    idDevice: string;
    tokenPush: string;
    isOnline: boolean;
    location: Location | string;
    createdAt: Date;
    updateAt: Date;
    user: User;
}
