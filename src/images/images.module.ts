import { AuthModule } from 'src/auth/auth.module';
import { Session } from 'src/auth/entities/session.entity';
import { User } from 'src/auth/entities/user.entity';
import { entityimagesDealers } from 'src/images/entities/dealers.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../client/market/entities/order.entity';
import { entityimages1 } from './entities/images.entity';
import { entityimagesUser } from './entities/imagesUsers.entity';
import { entityimagesProduc } from './entities/imgProduc.entity';
import { GaleryController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  controllers: [GaleryController],
  providers: [ImagesService],
  imports: [
    TypeOrmModule.forFeature([
      Order,
      entityimages1,
      entityimagesUser,
      entityimagesProduc,
      entityimagesDealers,
    ]),
    AuthModule,
  ],
})
export class Images1Module {}
