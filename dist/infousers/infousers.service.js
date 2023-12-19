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
exports.datausersServices = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const addressbilling_entity_1 = require("./entities/addressbilling.entity");
const addressprofile_entity_1 = require("./entities/addressprofile.entity");
const billing_entity_1 = require("./entities/billing.entity");
const datausers_entity_1 = require("./entities/datausers.entity");
let datausersServices = class datausersServices {
    constructor(setdatausers, setaddressusers, setbilling, setAddressbilling) {
        this.setdatausers = setdatausers;
        this.setaddressusers = setaddressusers;
        this.setbilling = setbilling;
        this.setAddressbilling = setAddressbilling;
    }
    async insertinfo(dataUsers) {
        console.log("entro a servicio de prueba");
        console.log(dataUsers);
        const datosbase2 = this.setdatausers.create({
            id_user: dataUsers.id_user,
            name: dataUsers.name,
            lastname: dataUsers.lastname,
            email: dataUsers.email,
            phone: dataUsers.phone,
            birthdate: dataUsers.birthdate,
            gender: dataUsers.gender,
        });
        await datosbase2.save();
        return datosbase2;
    }
    async add_Address(dataAddresUser) {
        console.log("entro a servicio de prueba");
        console.log(dataAddresUser);
        const datosbase2 = this.setaddressusers.create({
            id_user: dataAddresUser.id_user,
            country: dataAddresUser.country,
            state: dataAddresUser.state,
            city: dataAddresUser.city,
            contry_code: dataAddresUser.contry_code,
            delegation: dataAddresUser.delegation,
            street: dataAddresUser.street,
            number: dataAddresUser.number,
            interior_num: dataAddresUser.interior_num,
            type: dataAddresUser.type,
            reference: dataAddresUser.reference,
        });
        await datosbase2.save();
        return datosbase2;
    }
    async postbilling(databilling) {
        console.log("entro a servicio de prueba");
        console.log(databilling);
        const datosbase2 = this.setbilling.create({
            id_user: databilling.id_user,
            rfc: databilling.rfc,
            type_of_person: databilling.type_of_person,
            legal_name: databilling.legal_name,
            payment_method: databilling.payment_method,
            tax_regime: databilling.tax_regime,
            name: databilling.name,
            email: databilling.email,
            phone: databilling.phone,
        });
        await datosbase2.save();
        return datosbase2;
    }
    async postAddress_billing(dataAddressFiscal) {
        console.log("entro a servicio de prueba");
        console.log(dataAddressFiscal);
        const datosbase2 = this.setAddressbilling.create({
            id_user: dataAddressFiscal.id_user,
            street: dataAddressFiscal.street,
            neighborhood: dataAddressFiscal.neighborhood,
            number: dataAddressFiscal.number,
            num_inter: dataAddressFiscal.num_inter,
            contry_code: dataAddressFiscal.contry_code,
            city: dataAddressFiscal.city,
        });
        await datosbase2.save();
        return datosbase2;
    }
    async setlibAddress(idhotel) {
        const datosbase1 = await this.setaddressusers.find({
            where: {
                id_user: idhotel,
            },
        });
        return datosbase1;
    }
    async editAddresUser(dataAddresUser) {
        console.log("entro a servicio de prueba");
        console.log(dataAddresUser);
        const datosbase1 = await this.setaddressusers.update({ id_address: dataAddresUser.id_address }, {
            id_user: dataAddresUser.id_user,
            country: dataAddresUser.country,
            state: dataAddresUser.state,
            city: dataAddresUser.city,
            contry_code: dataAddresUser.contry_code,
            delegation: dataAddresUser.delegation,
            street: dataAddresUser.street,
            number: dataAddresUser.number,
            interior_num: dataAddresUser.interior_num,
            type: dataAddresUser.type,
            reference: dataAddresUser.reference,
        });
        return datosbase1;
    }
};
exports.datausersServices = datausersServices;
exports.datausersServices = datausersServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(datausers_entity_1.datausersEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(addressprofile_entity_1.addres_profileEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(billing_entity_1.billingEntity)),
    __param(3, (0, typeorm_2.InjectRepository)(addressbilling_entity_1.addressbillingEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], datausersServices);
//# sourceMappingURL=infousers.service.js.map