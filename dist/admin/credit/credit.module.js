"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditModule = void 0;
const common_1 = require("@nestjs/common");
const credit_service_1 = require("./credit.service");
const credit_controller_1 = require("./credit.controller");
const typeorm_1 = require("@nestjs/typeorm");
const credit_entity_1 = require("./entities/credit.entity");
const auth_module_1 = require("../../auth/auth.module");
const balance_entity_1 = require("../../client/balance/entities/balance.entity");
let CreditModule = class CreditModule {
};
exports.CreditModule = CreditModule;
exports.CreditModule = CreditModule = __decorate([
    (0, common_1.Module)({
        controllers: [credit_controller_1.CreditController],
        providers: [credit_service_1.CreditService],
        imports: [typeorm_1.TypeOrmModule.forFeature([credit_entity_1.Credit, balance_entity_1.Balance]), auth_module_1.AuthModule]
    })
], CreditModule);
//# sourceMappingURL=credit.module.js.map