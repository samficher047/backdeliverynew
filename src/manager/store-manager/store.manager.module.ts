import { Module } from '@nestjs/common';
import { StoreManagerService } from './store.manager.service';
import { StoreManagerController } from './store.manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Company } from 'src/admin/company/entities/company.entity';
import { Store } from 'src/admin/store/entities/store.entity';
import { Product } from 'src/admin/product/entities/product.entity';
import { HoursOperation } from 'src/admin/hours-peration/entities/hours-peration.entity';

@Module({
  controllers: [StoreManagerController],
  providers: [StoreManagerService],
  imports: [TypeOrmModule.forFeature([Company, Store, Product, HoursOperation]), AuthModule],

})
export class StoreManagerModule { }
