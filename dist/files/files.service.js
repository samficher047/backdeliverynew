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
exports.FilesServices = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const files_entity_1 = require("./entities/files.entity");
let FilesServices = class FilesServices {
    constructor(setfiles) {
        this.setfiles = setfiles;
    }
    async infoFiles(idimge) {
        console.log('entro a servicio de prueba');
        console.log(idimge);
        const datosbase1 = await this.setfiles.find({
            where: {
                id_files: idimge,
            },
        });
        return datosbase1;
    }
    async insertReg(id_user, namefile, newname, rutefile) {
        const resultEntities = [];
        const datosbase2 = this.setfiles.create({
            id_user: id_user,
            origin_name_file: namefile,
            new_name_file: newname,
            rute: rutefile,
        });
        await datosbase2.save();
        resultEntities.push(datosbase2);
        return datosbase2;
    }
    async infofilesofUser(iduser) {
        const datosbase1 = await this.setfiles.find({
            where: {
                id_user: iduser,
            },
        });
        return datosbase1;
    }
    async deletefile(data) {
        const datosbase1 = await this.setfiles.delete({
            id_files: data,
        });
        return datosbase1;
    }
};
exports.FilesServices = FilesServices;
exports.FilesServices = FilesServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(files_entity_1.typefiles)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], FilesServices);
//# sourceMappingURL=files.service.js.map