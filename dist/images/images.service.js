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
exports.ImagesService = void 0;
const images_entity_1 = require("./entities/images.entity");
const imagesUsers_entity_1 = require("./entities/imagesUsers.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let ImagesService = class ImagesService {
    constructor(conectimages1, connectimages2) {
        this.conectimages1 = conectimages1;
        this.connectimages2 = connectimages2;
    }
    async infoimg(idimge) {
        console.log('entro a servicio de prueba');
        console.log(idimge);
        const datosbase1 = await this.conectimages1.find({
            where: {
                id_img: idimge,
            },
        });
        return datosbase1;
    }
    async insertReg(name, filename, path, size, originalname) {
        const resultEntities = [];
        const datosbase2 = this.conectimages1.create({
            rute: path,
        });
        await datosbase2.save();
        resultEntities.push(datosbase2);
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos mandados a tabla>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(datosbase2);
        return datosbase2;
    }
    async insertRegUser(id_user, filename, path, size, originalname, type) {
        const resultEntities = [];
        const datosbase2 = this.connectimages2.create({
            id_imgUser: id_user,
            originalName: originalname,
            filename: filename,
            rute: path,
            size: size,
            id_user: id_user,
            type_user: type,
        });
        await datosbase2.save();
        resultEntities.push(datosbase2);
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<datos mandados a tabla>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(datosbase2);
        return datosbase2;
    }
    async infoimgUser(idimge) {
        console.log('entro a servicio de prueba');
        console.log(idimge);
        const datosbase1 = await this.connectimages2.find({
            where: {
                id_imgUser: idimge,
            },
        });
        return datosbase1;
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(images_entity_1.entityimages1)),
    __param(1, (0, typeorm_2.InjectRepository)(imagesUsers_entity_1.entityimagesUser)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ImagesService);
//# sourceMappingURL=images.service.js.map