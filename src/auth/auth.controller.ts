import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';

import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';
import { UpdateTokenPushDto } from './dto/update-token-push.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { users_CodesService } from 'src/users_codes/usersCodes.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private infoUsers: users_CodesService,
  ) {}

  @Post('google')
  google(@Body() googleUserDto: GoogleUserDto) {
    return this.authService.google(googleUserDto);
  }

  @Patch('recover/:email')
  recoverAccount(@Param('email') email: string) {
    return this.authService.recoverAccount(email);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const result1 = await this.authService.register(createUserDto);
    const result2 = await this.authService.updateregister(
      result1.user.id,
      createUserDto.rol,
    );
    const resultcode = await this.infoUsers.GenerateCode(result1.user.id);
    const result3 = this.authService.inforegister(result1.user.id);
    console.log('result3');
    console.log(result3);
    return {
      user: {
        fullName: result1.user.fullName,
        email: result1.user.email,
        phone: result1.user.phone,
        idGoogle: result1.user.idGoogle,
        passwordTemporary: result1.user.passwordTemporary,
        id: result1.user.id,
        image: result1.user.image,
        isActive: result1.user.isActive,
        roles: [createUserDto.rol],
        createdAt: result1.user.createdAt,
        updatedAt: result1.user.updatedAt,
        token: result1.user.token,
      },
    };
  }

  @Patch('update')
  @Auth()
  update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(user, updateUserDto);
  }

  @Patch('update-passwor')
  @Auth()
  updatePasswor(
    @GetUser() user: User,
    @Body() passwordUserDto: PasswordUserDto,
  ) {
    return this.authService.updatePasswor(user, passwordUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch('check/:idDevice')
  @Auth()
  checkStatus(
    @GetUser() user: User,
    @Param('idDevice', ParseUUIDPipe) idDevice: string,
  ) {
    return this.authService.checkStatus(user, idDevice);
  }

  @Patch('update-token-push')
  @Auth()
  updateTokenPush(
    @Body() updateTokenPushDto: UpdateTokenPushDto,
    @GetUser() user: User,
  ) {
    return this.authService.updateTokenPush(user, updateTokenPushDto);
  }

  @Delete('log-out/:idDevice')
  @Auth()
  logOut(
    @GetUser() user: User,
    @Param('idDevice', ParseUUIDPipe) idDevice: string,
  ) {
    return this.authService.logOut(user, idDevice);
  }
}
