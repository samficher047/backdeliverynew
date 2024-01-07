"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletModule = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const wallet_controller_1 = require("./wallet.controller");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("./entities/wallet.entity");
let walletModule = class walletModule {
};
exports.walletModule = walletModule;
exports.walletModule = walletModule = __decorate([
    (0, common_1.Module)({
        controllers: [wallet_controller_1.WalletController],
        providers: [wallet_service_1.WalletService],
        imports: [typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.Wallet])],
    })
], walletModule);
//# sourceMappingURL=wallet.module.js.map