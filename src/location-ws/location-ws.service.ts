import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Session } from '../auth/entities/session.entity';

@Injectable()
export class LocationWsService {

    private readonly logger = new Logger('LocationWsService');

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
    ) { }

    async registerUser(socket: Socket, idUser: number) {
        const user = await this.userRepository.findOneBy({ id: idUser });
        if (!user || !user.isActive) throw new Error('User denied permissions to access');
        socket['isAuth'] = true;
    }

    async updateLocation(idUser: any, data: JSON) {
        try {
            this.sessionRepository.createQueryBuilder('s')
                .update({ location: `${data[0]}, ${data[1]}` })
                .where({ user: { id: idUser } })
                .execute();
        } catch (error) {
            handleDbExceptions(error, this.logger);
        }
    }
}

