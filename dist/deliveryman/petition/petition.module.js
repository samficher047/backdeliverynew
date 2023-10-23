"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetitionModule = void 0;
const common_1 = require("@nestjs/common");
const petition_service_1 = require("./petition.service");
const petition_controller_1 = require("./petition.controller");
const auth_module_1 = require("../../auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../../client/market/entities/order.entity");
const notification_module_1 = require("../../notification/notification.module");
const balance_entity_1 = require("../../client/balance/entities/balance.entity");
let PetitionModule = class PetitionModule {
};
exports.PetitionModule = PetitionModule;
exports.PetitionModule = PetitionModule = __decorate([
    (0, common_1.Module)({
        controllers: [petition_controller_1.PetitionController],
        providers: [petition_service_1.PetitionService],
        imports: [typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, balance_entity_1.Balance]), auth_module_1.AuthModule, notification_module_1.NotificationModule]
    })
], PetitionModule);
//# sourceMappingURL=petition.module.js.map