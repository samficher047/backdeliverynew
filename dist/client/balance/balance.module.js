"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceModule = void 0;
const common_1 = require("@nestjs/common");
const balance_service_1 = require("./balance.service");
const balance_controller_1 = require("./balance.controller");
const typeorm_1 = require("@nestjs/typeorm");
const balance_entity_1 = require("./entities/balance.entity");
const auth_module_1 = require("../../auth/auth.module");
const user_entity_1 = require("../../auth/entities/user.entity");
let BalanceModule = class BalanceModule {
};
exports.BalanceModule = BalanceModule;
exports.BalanceModule = BalanceModule = __decorate([
    (0, common_1.Module)({
        controllers: [balance_controller_1.BalanceController],
        providers: [balance_service_1.BalanceService],
        imports: [typeorm_1.TypeOrmModule.forFeature([balance_entity_1.Balance, user_entity_1.User]), auth_module_1.AuthModule],
    })
], BalanceModule);
//# sourceMappingURL=balance.module.js.map