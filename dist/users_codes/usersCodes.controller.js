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
exports.users_Codes_Controller = void 0;
const usersCodes_service_1 = require("./usersCodes.service");
const common_1 = require("@nestjs/common");
let users_Codes_Controller = class users_Codes_Controller {
    constructor(infoUsers) {
        this.infoUsers = infoUsers;
    }
    async generateCode(IdUser) {
        const result = await this.infoUsers.GenerateCode(IdUser);
        return result;
    }
    async events(IdUser) {
        const result = await this.infoUsers.getInfoUsers(IdUser);
        console.log(result);
        return result;
    }
    async updateUser(SendRequest) {
        const result = await this.infoUsers.updateInfoUser(SendRequest);
        console.log(result);
        return result;
    }
    async setUnionUser(SendRequest) {
        const result = await this.infoUsers.unionUsers(SendRequest);
        return result;
    }
};
exports.users_Codes_Controller = users_Codes_Controller;
__decorate([
    (0, common_1.Get)('/generateCod'),
    __param(0, (0, common_1.Query)('id_user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], users_Codes_Controller.prototype, "generateCode", null);
__decorate([
    (0, common_1.Get)('/infoUser'),
    __param(0, (0, common_1.Query)('id_user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], users_Codes_Controller.prototype, "events", null);
__decorate([
    (0, common_1.Get)('/UpdateUser'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], users_Codes_Controller.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('/setunionUsers'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], users_Codes_Controller.prototype, "setUnionUser", null);
exports.users_Codes_Controller = users_Codes_Controller = __decorate([
    (0, common_1.Controller)('users_Codes'),
    __metadata("design:paramtypes", [usersCodes_service_1.users_CodesService])
], users_Codes_Controller);
//# sourceMappingURL=usersCodes.controller.js.map