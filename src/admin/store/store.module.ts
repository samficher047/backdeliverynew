import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store } from './entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Company } from '../company/entities/company.entity';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [TypeOrmModule.forFeature([Store, Company]), AuthModule]
})
export class StoreModule { }
