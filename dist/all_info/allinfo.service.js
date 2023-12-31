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
exports.allinfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallet_entity_1 = require("../wallet/entities/wallet.entity");
const users_entity_1 = require("../users_codes/entities/users.entity");
let allinfoService = class allinfoService {
    constructor(Wallet, userexist) {
        this.Wallet = Wallet;
        this.userexist = userexist;
    }
    async getinfouser(idusuario) {
        try {
            const Walletget = await this.userexist.find({
                where: {
                    id: idusuario,
                },
            });
            return Walletget[0];
        }
        catch (error) { }
    }
};
exports.allinfoService = allinfoService;
exports.allinfoService = allinfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.userexist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], allinfoService);
//# sourceMappingURL=allinfo.service.js.map