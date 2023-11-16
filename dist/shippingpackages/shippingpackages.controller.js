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
exports.ShippingPackagesController = void 0;
const common_1 = require("@nestjs/common");
const shippingpackages_service_1 = require("./shippingpackages.service");
let ShippingPackagesController = class ShippingPackagesController {
    constructor(shippingpackages) {
        this.shippingpackages = shippingpackages;
    }
    async events() {
        const result = await this.shippingpackages.gettoken();
        console.log(result);
        return result;
    }
    async RequestPurchaseTickets(SendRequest) {
        console.log('entro');
        const result = await this.shippingpackages.newrate(SendRequest);
        return result;
    }
    async shipmentsfedex(FedExRequ) {
        console.log('entro');
        const result = await this.shippingpackages.newratefedex(FedExRequ);
        return result;
    }
    async generatelabel(datalabel) {
        console.log('entro');
        const result = await this.shippingpackages.newlabel(datalabel);
        return result;
    }
};
exports.ShippingPackagesController = ShippingPackagesController;
__decorate([
    (0, common_1.Get)('/gettoken'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShippingPackagesController.prototype, "events", null);
__decorate([
    (0, common_1.Post)('/shipmentsrate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShippingPackagesController.prototype, "RequestPurchaseTickets", null);
__decorate([
    (0, common_1.Post)('/shipmentsfedex'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShippingPackagesController.prototype, "shipmentsfedex", null);
__decorate([
    (0, common_1.Post)('/generatelabel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShippingPackagesController.prototype, "generatelabel", null);
exports.ShippingPackagesController = ShippingPackagesController = __decorate([
    (0, common_1.Controller)('shippingpackages'),
    __metadata("design:paramtypes", [shippingpackages_service_1.ShippingPackagesService])
], ShippingPackagesController);
//# sourceMappingURL=shippingpackages.controller.js.map