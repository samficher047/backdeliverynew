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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingDHLController = void 0;
const shipmentsdhl_service_1 = require("./shipmentsdhl.service");
const common_1 = require("@nestjs/common");
let ShippingDHLController = class ShippingDHLController {
    constructor(shippingpackages) {
        this.shippingpackages = shippingpackages;
    }
    async events() {
        const result = await this.shippingpackages.gettoken();
        return result;
    }
};
exports.ShippingDHLController = ShippingDHLController;
__decorate([
    (0, common_1.Get)('/gettoken'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShippingDHLController.prototype, "events", null);
exports.ShippingDHLController = ShippingDHLController = __decorate([
    (0, common_1.Controller)('shipingDHLpackages'),
    __metadata("design:paramtypes", [shipmentsdhl_service_1.ShippingDHLService])
], ShippingDHLController);
//# sourceMappingURL=shipmentsdhl.controller.js.map