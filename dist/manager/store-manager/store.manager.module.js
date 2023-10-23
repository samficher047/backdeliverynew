"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreManagerModule = void 0;
const common_1 = require("@nestjs/common");
const store_manager_service_1 = require("./store.manager.service");
const store_manager_controller_1 = require("./store.manager.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../../auth/auth.module");
const company_entity_1 = require("../../admin/company/entities/company.entity");
const store_entity_1 = require("../../admin/store/entities/store.entity");
const product_entity_1 = require("../../admin/product/entities/product.entity");
const hours_peration_entity_1 = require("../../admin/hours-peration/entities/hours-peration.entity");
let StoreManagerModule = class StoreManagerModule {
};
exports.StoreManagerModule = StoreManagerModule;
exports.StoreManagerModule = StoreManagerModule = __decorate([
    (0, common_1.Module)({
        controllers: [store_manager_controller_1.StoreManagerController],
        providers: [store_manager_service_1.StoreManagerService],
        imports: [typeorm_1.TypeOrmModule.forFeature([company_entity_1.Company, store_entity_1.Store, product_entity_1.Product, hours_peration_entity_1.HoursOperation]), auth_module_1.AuthModule],
    })
], StoreManagerModule);
//# sourceMappingURL=store.manager.module.js.map