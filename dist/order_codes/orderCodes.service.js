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
exports.OrderCodes_Service = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const orders_entity_1 = require("./entities/orders.entity");
let OrderCodes_Service = class OrderCodes_Service {
    constructor(setOrderCodes) {
        this.setOrderCodes = setOrderCodes;
    }
    async getValidOrder(validateorder) {
        console.log('shared information=> ');
        console.log(validateorder.code);
        console.log(validateorder.id_order);
        try {
            const datosbase1 = await this.setOrderCodes.find({
                where: {
                    id_order: validateorder.id_order,
                    code: validateorder.code,
                },
            });
            if (datosbase1.length == 1) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
        }
    }
    async createOrderCode(validateorder) {
        try {
            const datosbase1 = await this.setOrderCodes.find({
                where: {
                    id_order: validateorder.id_order,
                },
            });
            if (datosbase1.length === 0) {
                const hexCode = Math.floor(Math.random() * 0xFFFFF).toString(16).toUpperCase().padStart(5, '0');
                const datosbd = this.setOrderCodes.create({
                    id_order: validateorder.id_order,
                    code: hexCode,
                });
                await datosbd.save();
                return datosbd;
            }
            return datosbase1;
            return true;
        }
        catch (error) {
            console.log(error);
        }
    }
    async GenerateCode(idUsers) {
        function convertirAAlfanumerico(numero, longitud) {
            const cadenaNumerica = idUsers.toString();
            const longitudAdicional = longitud - cadenaNumerica.length;
            const caracteresAleatorios = Array.from({ length: longitudAdicional }, () => Math.random().toString(36).charAt(2));
            const codigoAlfanumerico = cadenaNumerica + caracteresAleatorios.join('');
            return codigoAlfanumerico;
        }
        const digito = 5;
        const codigoResultado = convertirAAlfanumerico(digito, 6);
        console.log(codigoResultado);
        const datosbd = this.setOrderCodes.create({
            id_user: idUsers,
            code: codigoResultado,
        });
        await datosbd.save();
        return datosbd;
    }
};
exports.OrderCodes_Service = OrderCodes_Service;
exports.OrderCodes_Service = OrderCodes_Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(orders_entity_1.orderCodes)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], OrderCodes_Service);
//# sourceMappingURL=orderCodes.service.js.map