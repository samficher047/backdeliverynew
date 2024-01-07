"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallet_entity_1 = require("./entities/wallet.entity");
let WalletService = class WalletService {
    constructor(Wallet) {
        this.Wallet = Wallet;
    }
    async getsaldo(idusuario) {
        try {
            const Walletget = await this.Wallet.find({
                where: {
                    id_usuario: idusuario,
                },
            });
            let saldo = 0;
            let descuentos = 0;
            let total = 0;
            for (const record of Walletget) {
                if (record.flagentrada) {
                    saldo += Number(record.monto);
                }
            }
            for (const record of Walletget) {
                if (record.flagsalida) {
                    descuentos += Number(record.monto);
                }
            }
            console.log(saldo);
            console.log(descuentos);
            total = saldo - descuentos;
            return { saldo: saldo, descuentos: descuentos, total: total };
        }
        catch (error) { }
    }
    async gettransacciones(idusuario) {
        try {
            const Walletget = await this.Wallet.find({
                where: {
                    id_usuario: idusuario,
                },
            });
            return Walletget;
        }
        catch (error) { }
    }
    async setsaldo(Informationsent) {
        try {
            console.log(Informationsent);
            const Walletcreate = this.Wallet.create({
                id_usuario: Informationsent.idusuario,
                monto: Informationsent.monto,
                flagentrada: Informationsent.flagentrada,
                flagsalida: Informationsent.flagsalida,
            });
            await Walletcreate.save();
            return [Walletcreate];
        }
        catch (error) { }
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WalletService);
//# sourceMappingURL=wallet.service.js.map