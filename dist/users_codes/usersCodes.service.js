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
exports.users_CodesService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("./entities/users.entity");
const usersCodes_entity_1 = require("./entities/usersCodes.entity");
let users_CodesService = class users_CodesService {
    constructor(infoUsers, setinfopri) {
        this.infoUsers = infoUsers;
        this.setinfopri = setinfopri;
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
        const datosbd = this.infoUsers.create({
            id_user: idUsers,
            code: codigoResultado,
        });
        await datosbd.save();
        return datosbd;
    }
    async getInfoUsers(idUsers) {
        console.log('idUsers');
        console.log(idUsers);
        try {
            const datosbase1 = await this.infoUsers.find({
                where: {
                    id_user: idUsers,
                },
            });
            return datosbase1[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateInfoUser(SendRequest) {
        const datosbase1 = await this.infoUsers.update({ id_user: SendRequest.id_user }, {
            id_company: SendRequest.id_compani,
        });
        console.log('datosbase1=>');
        console.log(datosbase1);
        return datosbase1;
    }
    async unionUsers(SendRequest) {
        const datosbase1 = await this.infoUsers.find({
            where: {
                id_company: SendRequest.id_compani,
            },
        });
        const promises = datosbase1.map(async (item) => {
            return await this.setinfopri.find({
                where: {
                    id: item.id_user,
                },
            });
        });
        const infobase2Array = await Promise.all(promises);
        const ResultArray = [].concat(...infobase2Array);
        const InfoUnion = datosbase1.map((item) => ({
            id: item.id_user,
            name: ResultArray.find((user) => user.id === item.id_user)?.fullName || '',
            code: item.code,
        }));
        console.log('InfoUnion:');
        console.log(InfoUnion);
        return InfoUnion;
    }
};
exports.users_CodesService = users_CodesService;
exports.users_CodesService = users_CodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(usersCodes_entity_1.users_code)),
    __param(1, (0, typeorm_2.InjectRepository)(users_entity_1.userexist)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], users_CodesService);
//# sourceMappingURL=usersCodes.service.js.map