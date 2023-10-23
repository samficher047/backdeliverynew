import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ErrorCode } from 'src/common/glob/error';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
    ) {
        super({
            secretOrKey: process.env.JWT_SECREAT,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { id, idDevice } = payload;
        const user = await this.userRepository.findOneBy({ id });

        if (!user)
            throw new UnauthorizedException({ codeError: ErrorCode.UNAUTHORIZED, message: 'Token not valid' });

        if (!user.isActive)
            throw new UnauthorizedException({ codeError: ErrorCode.UNAUTHORIZED, message: 'User is inactive, talk with an admin' });

        const session = await this.sessionRepository.findOneBy({ user: { id: user.id }, idDevice });
        if (!session)
            throw new UnauthorizedException({ codeError: ErrorCode.UNAUTHORIZED, message: 'Session not valid' });

        return user;
    }

}