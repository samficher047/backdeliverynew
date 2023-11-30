import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { userexist } from "./entities/users.entity"
import { users_code } from './entities/usersCodes.entity'
import { users_Codes_Controller } from './usersCodes.controller';
import { users_CodesService } from './usersCodes.service';

@Module({
  controllers: [users_Codes_Controller],
  providers: [users_CodesService],
  imports: [
    TypeOrmModule.forFeature([
      users_code,
      userexist,
    ]),
    
  ],
})
export class UsersCodeModule {}
