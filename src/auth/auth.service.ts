import { Injectable, Logger, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import handleDbExceptions from "src/common/exceptions/error.db.exception";
import { Session } from './entities/session.entity';
import { UpdateTokenPushDto } from './dto/update-token-push.dto';
import { ErrorCode } from 'src/common/glob/error';
import { GoogleUserDto } from './dto/google-user.dto';
import { EmailService } from '../email/email.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';

@Injectable()
export class AuthService {


  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,

    @Inject(EmailService)
    private readonly emailServiceService: EmailService,

    private readonly jwtService: JwtService,
  ) { }


  async google(googleUserDto: GoogleUserDto) {
    const { email, idGoogle, tokenPush, idDevice } = googleUserDto;

    try {
      const response = await this.userRepository.createQueryBuilder('uss')
        .update({ idGoogle })
        .where({ email }).execute();

      let user: User;
      // Linked account
      if (response.affected > 0) {
        user = await this.userRepository.findOne({
          where: { email },
          select: { image: true, email: true, password: true, id: true, roles: true, fullName: true, phone: true }
        });
      } else {
        user = this.userRepository.create({ ...googleUserDto, password: bcrypt.hashSync(Date().toString(), 1) });
        await this.userRepository.save(user)
      }

      await this._saveSession(user, idDevice, tokenPush);

      return { user: { ...user, token: this._getJwtToken({ id: user.id, email: user.email, idDevice }) } };

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async register(createUserDto: CreateUserDto) {

    const { password, tokenPush, ...userData } = createUserDto;

    const verification = await this.userRepository.createQueryBuilder("us")
      .andWhere("(us.email = :emal OR us.phone = :phone)")
      .setParameters({ emal: userData.email, phone: userData.phone }).getOne();

    if (verification) {
      if (verification['email'] === userData.email) {
        throw new BadRequestException({ codeError: ErrorCode.EMAILUNIQUE });
      } else if (verification['phone'] === userData.phone) {
        throw new BadRequestException({ codeError: ErrorCode.PHONEUNIQUE });
      } else {
        throw new BadRequestException({ codeError: ErrorCode.UNKNOWN });
      }
    }

    try {
      const user = this.userRepository.create({ ...userData, password: bcrypt.hashSync(password, 3) });
      await this.userRepository.save(user)

      await this._saveSession(user, userData.idDevice, tokenPush);

      delete user.password;
      return { user: { ...user, token: this._getJwtToken({ id: user.id, email: user.email, idDevice: userData.idDevice }) } };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email, idDevice, tokenPush } = loginUserDto;
    const user = await this.userRepository
      .findOne({
        where: { email },
        select: { image: true, email: true, password: true, passwordTemporary: true, id: true, roles: true, fullName: true, phone: true }
      });

    if (!user) {
      throw new UnauthorizedException('UnauthorizedException');
    }

    if (!bcrypt.compareSync(password, user.password) && !bcrypt.compareSync(password, user.passwordTemporary)) {
      throw new UnauthorizedException('UnauthorizedException');
    }

    await this._saveSession(user, idDevice, tokenPush);

    delete user.password;
    delete user.passwordTemporary; 
    return { ...user, token: this._getJwtToken({ id: user.id, email: user.email, idDevice }) };
  }

  async checkStatus(user: User, idDevice: string,) {
    const session = await this.sessionRepository
      .findOne({ where: { user: { id: user.id }, idDevice }, select: { id: true } });
    if (session)
      return { user };
    else
      throw new UnauthorizedException({ codeError: ErrorCode.UNAUTHORIZED });
  }

  async updateTokenPush(user: User, updateTokenPushDto: UpdateTokenPushDto) {
    const { idDevice, tokenPush } = updateTokenPushDto;
    try {
      await this.sessionRepository.createQueryBuilder()
        .update({ tokenPush })
        .where({ user, idDevice }).execute();
      return { updateTokenPush: true };;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async logOut(user: User, idDevice: string,) {
    await this.sessionRepository.delete({ user: { id: user.id }, idDevice });
    return { logOut: true };
  }

  async update(user: User, updateUserDto: UpdateUserDto) {

    const verification = await this.userRepository.createQueryBuilder("us")
      .andWhere("(us.email = :emal OR us.phone = :phone) AND us.id != :userId")
      .setParameters({ emal: updateUserDto.email, phone: updateUserDto.phone, userId: user.id }).getOne();

    if (verification) {
      if (verification['email'] === updateUserDto.email) {
        throw new BadRequestException({ codeError: ErrorCode.EMAILUNIQUE });
      } else if (verification['phone'] === updateUserDto.phone) {
        throw new BadRequestException({ codeError: ErrorCode.PHONEUNIQUE });
      } else {
        throw new BadRequestException({ codeError: ErrorCode.UNKNOWN });
      }
    }

    try {
      const userUpdate = await this.userRepository.preload({ id: user.id, ...updateUserDto });

      if (userUpdate) {
        await this.userRepository.save(userUpdate);

        delete userUpdate.password;
        delete userUpdate.passwordTemporary;
        return { user: { ...userUpdate } };
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async updatePasswor(user: User, passwordUserDto: PasswordUserDto) {
    const { password } = passwordUserDto;
    try {
      const userUpdate = await this.userRepository.preload({ id: user.id, password: bcrypt.hashSync(password, 3) });

      if (userUpdate) {
        await this.userRepository.save(userUpdate);

        delete userUpdate.password;
        delete userUpdate.passwordTemporary;
        return { user: { ...userUpdate } };
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async recoverAccount(email: string) {
    const passwordTemporary = this._generatePassword();
    try {
      const response = await this.userRepository.createQueryBuilder('uss')
        .update({ passwordTemporary: bcrypt.hashSync(passwordTemporary, 3) })
        .where({ email }).execute();

      if (response.affected > 0) {
        const user = await this.userRepository.findOne({ where: { email }, select: { id: true, fullName: true } });
        this.emailServiceService.sendPassword(user.fullName, email, passwordTemporary);
        return { recover: true };
      }
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
    throw new BadRequestException({ codeError: ErrorCode.ACCOUNTNOTEXIST });
  }

  private _getJwtToken(jwtpayload: JwtPayload) {
    return this.jwtService.sign(jwtpayload);
  }

  private async _saveSession(user: User, idDevice: string, tokenPush: string) {
    if (tokenPush) await this.sessionRepository.delete({ tokenPush });
    await this.sessionRepository.delete({ user: { id: user.id }, idDevice: idDevice });
    const session = this.sessionRepository.create({ user, idDevice, tokenPush });
    await this.sessionRepository.save(session);
  }

  private _generatePassword() {
    const numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let clave = '';
    for (let i = 0; i < 6; i++)
      clave += numbers1[Math.floor(Math.random() * numbers1.length)];
    return (clave);
  }

}
