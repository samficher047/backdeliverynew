import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { addres_profileEntity } from './entities/addressprofile.entity'
import { datausersEntity } from './entities/datausers.entity';
import { dataUsersController } from './infousers.controller';
import { datausersServices } from './infousers.service';

@Module({
  controllers: [dataUsersController],
  providers: [datausersServices],
  imports: [TypeOrmModule.forFeature([datausersEntity, addres_profileEntity])],
})
export class DataUsersModule {}
