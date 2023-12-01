import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Session } from 'src/auth/entities/session.entity';
import { EmailModule } from '../email/email.module';
import { users_code } from 'src/users_codes/entities/usersCodes.entity';
import { userexist } from 'src/users_codes/entities/users.entity';
import { users_CodesService } from 'src/users_codes/usersCodes.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, users_CodesService],
  imports: [
    TypeOrmModule.forFeature([User, Session, users_code, userexist]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECREAT,
          signOptions: { expiresIn: '1y' },
        };
      },
    }),
    EmailModule,
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
