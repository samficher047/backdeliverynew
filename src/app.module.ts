import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from './admin/category/category.module';
import { CompanyCategoryModule } from './admin/company-category/company-category.module';
import { CompanyModule } from './admin/company/company.module';
import { CreditModule } from './admin/credit/credit.module';
import { HoursOperationModule } from './admin/hours-peration/hours-peration.module';
import { ProductModule } from './admin/product/product.module';
import { StoreModule } from './admin/store/store.module';
import { AddressModule } from './client/address/address.module';
import { BalanceModule } from './client/balance/balance.module';
import { MarketModule } from './client/market/market.module';
import { PaymentsModule } from './client/payments/payments.module';
import { PetitionModule } from './deliveryman/petition/petition.module';
import { EnrollmentModule } from './manager/enrollment/enrollment.module';
import { RequestModule } from './manager/request/request.module';
import { StoreManagerModule } from './manager/store-manager/store.manager.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';
import { EmailModule } from './email/email.module';
import { FilesModule } from './files/files.module';
import { Images1Module } from './images/images.module';
import { DataUsersModule } from './infousers/infousers.module';
import { LandingDataModule } from './landingpage/landingpage.module';
import { LocationWsModule } from './location-ws/location-ws.module';
import { NotificationModule } from './notification/notification.module';
import { OrderCodesModule } from './order_codes/orderCodes.module';
import { ShippingPackagesModule } from './shippingpackages/shippingpackages.module';
import { UsersCodeModule } from './users_codes/usersCodes.module';
import { walletModule } from './wallet/wallet.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGatewayApp } from './socket/websocket.gateway';
import { allinfoModule } from './all_info/allinfo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
    CompanyModule,
    CommonModule,
    ProductModule,
    AuthModule,
    StoreModule,
    MarketModule,
    CategoryModule,
    CompanyCategoryModule,
    HoursOperationModule,
    PetitionModule,
    ChatModule,
    LocationWsModule,
    AddressModule,
    NotificationModule,
    BalanceModule,
    EmailModule,
    EnrollmentModule,
    StoreManagerModule,
    PaymentsModule,
    CreditModule,
    RequestModule,
    Images1Module,
    ShippingPackagesModule,
    UsersCodeModule,
    LandingDataModule,
    OrderCodesModule,
    FilesModule,
    DataUsersModule,
    walletModule,
    allinfoModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGatewayApp],
})
export class AppModule {}
