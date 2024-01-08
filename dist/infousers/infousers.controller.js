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
exports.dataUsersController = void 0;
const common_1 = require("@nestjs/common");
const infousers_service_1 = require("./infousers.service");
const rutefiles = 'files/files';
let dataUsersController = class dataUsersController {
    constructor(setServicesdataUsers) {
        this.setServicesdataUsers = setServicesdataUsers;
    }
    async postnewuser(datausers) {
        console.log('entro a controlador ');
        const result = await this.setServicesdataUsers.insertinfo(datausers);
        console.log('respuesta de insert');
        console.log(result);
        return result;
    }
    async addNewAddres(dataAddresUser) {
        console.log('entro a controlador');
        const result = await this.setServicesdataUsers.add_Address(dataAddresUser);
        console.log('respuesta de insert');
        console.log(result);
        return result;
    }
    async addBilling(databilling) {
        console.log('entro a controlador');
        const result = await this.setServicesdataUsers.postbilling(databilling);
        console.log('respuesta de insert');
        console.log(result);
        return result;
    }
    async addaddressfiscal(dataAddressFiscal) {
        console.log('entro a controlador');
        const result = await this.setServicesdataUsers.postAddress_billing(dataAddressFiscal);
        console.log('respuesta de insert');
        console.log(result);
        return result;
    }
    async setlibAddress(iduser) {
        console.log('entro a controlador de select');
        const result = await this.setServicesdataUsers.setlibAddress(iduser);
        console.log('respuesta de insert');
        console.log(result);
        return result;
    }
    async editAddresUser(dataAddresUser) {
        console.log('entro a controlador');
        const result = await this.setServicesdataUsers.editAddresUser(dataAddresUser);
        console.log('respuesta de insert');
        console.log(result);
        return result;
    }
    async DeleteAddress(iduser) {
        const result = await this.setServicesdataUsers.setlibAddress(iduser);
        console.log('respuesta de insert');
        console.log(result);
        return result;
    }
};
exports.dataUsersController = dataUsersController;
__decorate([
    (0, common_1.Post)("/insertNew"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], dataUsersController.prototype, "postnewuser", null);
__decorate([
    (0, common_1.Post)("/addAddress"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], dataUsersController.prototype, "addNewAddres", null);
__decorate([
    (0, common_1.Post)("/addDatabilling"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], dataUsersController.prototype, "addBilling", null);
__decorate([
    (0, common_1.Post)("/addresfiscal"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], dataUsersController.prototype, "addaddressfiscal", null);
__decorate([
    (0, common_1.Get)("/addresfiscal"),
    __param(0, (0, common_1.Query)('iduser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], dataUsersController.prototype, "setlibAddress", null);
__decorate([
    (0, common_1.Post)("/editAddress"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], dataUsersController.prototype, "editAddresUser", null);
__decorate([
    (0, common_1.Get)("/deleteAddress"),
    __param(0, (0, common_1.Query)('idAdds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], dataUsersController.prototype, "DeleteAddress", null);
exports.dataUsersController = dataUsersController = __decorate([
    (0, common_1.Controller)("dataUsers"),
    __metadata("design:paramtypes", [infousers_service_1.datausersServices])
], dataUsersController);
//# sourceMappingURL=infousers.controller.js.map