import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './entities/address.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [TypeOrmModule.forFeature([Address]), AuthModule]

})
export class AddressModule { }
