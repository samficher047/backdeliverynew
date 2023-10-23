import { Module } from '@nestjs/common';
import { LocationWsService } from './location-ws.service';
import { LocationWsGateway } from './location-ws.gateway';
import { AuthModule } from '../auth/auth.module';
import { Session } from 'src/auth/entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Module({
  providers: [LocationWsGateway, LocationWsService],
  imports: [TypeOrmModule.forFeature([User, Session]), AuthModule]
})
export class LocationWsModule { }
