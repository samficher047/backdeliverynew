import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Session } from '../auth/entities/session.entity';
export declare class LocationWsService {
    private readonly userRepository;
    private readonly sessionRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, sessionRepository: Repository<Session>);
    registerUser(socket: Socket, idUser: number): Promise<void>;
    updateLocation(idUser: any, data: JSON): Promise<void>;
}
