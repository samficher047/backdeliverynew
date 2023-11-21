"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingDHLService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
let ShippingDHLService = class ShippingDHLService {
    async gettoken() {
        try {
            const username = 'e45iG9fzB5oela7LxDIEOuQ7bgcJD5N4';
            const password = 'xzA6QXRUb15g17UG';
            const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
            const response = await axios_1.default.get('https://apigateway-sandbox.bluedart.com/in/transportation/token/v1/login', {
                headers: {
                    Authorization: authHeader
                }
            });
            const result = response.data['JWTToken'];
            return result;
        }
        catch (error) { }
    }
};
exports.ShippingDHLService = ShippingDHLService;
exports.ShippingDHLService = ShippingDHLService = __decorate([
    (0, common_1.Injectable)()
], ShippingDHLService);
//# sourceMappingURL=shipmentsdhl.service.js.map