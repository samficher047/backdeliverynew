"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const category_module_1 = require("./admin/category/category.module");
const company_category_module_1 = require("./admin/company-category/company-category.module");
const company_module_1 = require("./admin/company/company.module");
const credit_module_1 = require("./admin/credit/credit.module");
const hours_peration_module_1 = require("./admin/hours-peration/hours-peration.module");
const product_module_1 = require("./admin/product/product.module");
const store_module_1 = require("./admin/store/store.module");
const address_module_1 = require("./client/address/address.module");
const balance_module_1 = require("./client/balance/balance.module");
const market_module_1 = require("./client/market/market.module");
const payments_module_1 = require("./client/payments/payments.module");
const petition_module_1 = require("./deliveryman/petition/petition.module");
const enrollment_module_1 = require("./manager/enrollment/enrollment.module");
const request_module_1 = require("./manager/request/request.module");
const store_manager_module_1 = require("./manager/store-manager/store.manager.module");
const auth_module_1 = require("./auth/auth.module");
const chat_module_1 = require("./chat/chat.module");
const common_module_1 = require("./common/common.module");
const email_module_1 = require("./email/email.module");
const files_module_1 = require("./files/files.module");
const images_module_1 = require("./images/images.module");
const infousers_module_1 = require("./infousers/infousers.module");
const landingpage_module_1 = require("./landingpage/landingpage.module");
const location_ws_module_1 = require("./location-ws/location-ws.module");
const notification_module_1 = require("./notification/notification.module");
const orderCodes_module_1 = require("./order_codes/orderCodes.module");
const shippingpackages_module_1 = require("./shippingpackages/shippingpackages.module");
const usersCodes_module_1 = require("./users_codes/usersCodes.module");
const wallet_module_1 = require("./wallet/wallet.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const websocket_gateway_1 = require("./socket/websocket.gateway");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
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
            company_module_1.CompanyModule,
            common_module_1.CommonModule,
            product_module_1.ProductModule,
            auth_module_1.AuthModule,
            store_module_1.StoreModule,
            market_module_1.MarketModule,
            category_module_1.CategoryModule,
            company_category_module_1.CompanyCategoryModule,
            hours_peration_module_1.HoursOperationModule,
            petition_module_1.PetitionModule,
            chat_module_1.ChatModule,
            location_ws_module_1.LocationWsModule,
            address_module_1.AddressModule,
            notification_module_1.NotificationModule,
            balance_module_1.BalanceModule,
            email_module_1.EmailModule,
            enrollment_module_1.EnrollmentModule,
            store_manager_module_1.StoreManagerModule,
            payments_module_1.PaymentsModule,
            credit_module_1.CreditModule,
            request_module_1.RequestModule,
            images_module_1.Images1Module,
            shippingpackages_module_1.ShippingPackagesModule,
            usersCodes_module_1.UsersCodeModule,
            landingpage_module_1.LandingDataModule,
            orderCodes_module_1.OrderCodesModule,
            files_module_1.FilesModule,
            infousers_module_1.DataUsersModule,
            wallet_module_1.walletModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, websocket_gateway_1.SocketGatewayApp],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map