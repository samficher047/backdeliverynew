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
exports.allinfoController = void 0;
const common_1 = require("@nestjs/common");
const allinfo_service_1 = require("./allinfo.service");
let allinfoController = class allinfoController {
    constructor(WalletService) {
        this.WalletService = WalletService;
    }
    async getsaldo(idusuario) {
        const result = await this.WalletService.getinfouser(idusuario);
        return result;
    }
};
exports.allinfoController = allinfoController;
__decorate([
    (0, common_1.Get)('/getinfouser'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], allinfoController.prototype, "getsaldo", null);
exports.allinfoController = allinfoController = __decorate([
    (0, common_1.Controller)('allinfo'),
    __metadata("design:paramtypes", [allinfo_service_1.allinfoService])
], allinfoController);
//# sourceMappingURL=allinfo.controller.js.map