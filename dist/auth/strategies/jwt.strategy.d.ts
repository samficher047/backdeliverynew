import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    private readonly sessionRepository;
    constructor(userRepository: Repository<User>, sessionRepository: Repository<Session>);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
