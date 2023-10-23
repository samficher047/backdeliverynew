import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewCompany } from './views/company.view.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ViewProduct } from './views/product.view.entity';
import { Order } from './entities/order.entity';
import { CompanyCategory } from "src/admin/company-category/entities/company-category.entity";
import { Company } from '../../admin/company/entities/company.entity';
import { ViewCategory } from './views/category.view.entity';
import { Store } from 'src/admin/store/entities/store.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { Balance } from 'src/client/balance/entities/balance.entity';

@Module({
  controllers: [MarketController],
  providers: [MarketService],
  imports: [TypeOrmModule.forFeature([ViewCompany, ViewProduct, Store, Order, ViewCategory, Company, CompanyCategory, Balance]), AuthModule, NotificationModule]
})
export class MarketModule { }
