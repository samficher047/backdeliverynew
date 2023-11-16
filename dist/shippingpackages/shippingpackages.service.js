"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingPackagesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const querystring = require("querystring");
let ShippingPackagesService = class ShippingPackagesService {
    async gettoken() {
        try {
            const parametros = {
                grant_type: 'client_credentials',
                client_id: 'l79776518c5fcd4eaa90a3deb4e7f9c28d',
                client_secret: '6b10fef0164041319cd4ca7515d682f1',
            };
            const parametrosCodificados = querystring.stringify(parametros);
            const response = await axios_1.default.post('https://apis-sandbox.fedex.com/oauth/token', parametrosCodificados, {
                headers: {
                    ContentType: 'application/x-www-form-urlencoded',
                },
            });
            console.log(response.data['access_token']);
            const result = response.data['access_token'];
            return result;
        }
        catch (error) { }
    }
    async getquotes() {
        try {
            const username = 'TukmeinLLC_apiuser';
            const password = 'IMCpW-{Qe|';
            const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
            const response = await axios_1.default.get('https://api.preview.autoprocessor.com/V03/ApexInventoryService/DownloadCategories?PageNumber=1&IncludeInactive=true', {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            console.log(response.data['Data']);
            const result = response.data['Data'];
            return result;
        }
        catch (error) { }
    }
    async newrate(SendRequest) {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXV0aDB8NjBmODY4YTMzYTgzYTgwMDcwYjA0YjQwIiwidmlwIjpmYWxzZSwibmFtZSI6Ikp1bGlvIEdhcnphIiwiZW1haWwiOiJqZ2FyemFAZXFodW1hLmNvbSIsImlhdCI6MTYzNDk0MDg3M30.A3tV2Yp9tcDOIC59hwGhCHk60UVR6ihGh6p1Hi7K3uo';
            const response = await axios_1.default.post('https://sandbox.api-drenvio.com/v2/shipments/rate', SendRequest, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            const result = response.data;
            return result;
        }
        catch (error) { }
    }
    async newratefedex(FedExRequest) {
        try {
            const token = await this.gettoken();
            const response = await axios_1.default.post('https://apis-sandbox.fedex.com/rate/v1/rates/quotes', FedExRequest, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            const result = [response.data];
            return result;
        }
        catch (error) { }
    }
    async newlabel(Datalabel) {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXV0aDB8NjBmODY4YTMzYTgzYTgwMDcwYjA0YjQwIiwidmlwIjpmYWxzZSwibmFtZSI6Ikp1bGlvIEdhcnphIiwiZW1haWwiOiJqZ2FyemFAZXFodW1hLmNvbSIsImlhdCI6MTYzNDk0MDg3M30.A3tV2Yp9tcDOIC59hwGhCHk60UVR6ihGh6p1Hi7K3uo';
            const response = await axios_1.default.post('https://sandbox.api-drenvio.com/v2/shipments/generate', Datalabel, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            const result = response.data;
            return result;
        }
        catch (error) { }
    }
};
exports.ShippingPackagesService = ShippingPackagesService;
exports.ShippingPackagesService = ShippingPackagesService = __decorate([
    (0, common_1.Injectable)()
], ShippingPackagesService);
//# sourceMappingURL=shippingpackages.service.js.map