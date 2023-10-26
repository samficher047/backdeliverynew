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
exports.GaleryController = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const images_service_1 = require("./images.service");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
let GaleryController = class GaleryController {
    constructor(imagesServ) {
        this.imagesServ = imagesServ;
    }
    async events(idimge) {
        console.log('id=>');
        console.log(idimge);
        const result = await this.imagesServ.infoimg(idimge);
        return result;
    }
    async insertphoto(name, image) {
        if (!name || !image) {
            return 'Faltan datos requeridos.';
        }
        console.log('datos a insertar: ');
        console.log(name);
        console.log(image);
        const resultInsert = await this.imagesServ.insertReg(name, image.filename, image.path, image.size, image.originalname);
        return 'Imagen subida exitosamente';
    }
    async insertphotoUser(id_user, type, image) {
        if (!id_user || !image) {
            return 'Faltan datos requeridos.';
        }
        console.log('datos a insertar: ');
        console.log(id_user);
        console.log(image);
        const resultInsert = await this.imagesServ.insertRegUser(id_user, image.filename, image.path, image.size, image.originalname, type);
        return 'Imagen subida exitosamente';
    }
    async imguser(idimge) {
        console.log('id=>');
        console.log(idimge);
        const result = await this.imagesServ.infoimgUser(idimge);
        return result;
    }
    async insertphotoProd(name_prod, id_user, type, images) {
        if (!images || images.length === 0) {
            return 'Faltan datos requeridos.';
        }
        console.log('datos a insertar: ');
        console.log(id_user);
        console.log(images);
        let keyGroup = 0;
        for (let i = 0; i < images.length; i++) {
            const dat = images[i];
            const resultInsert = await this.imagesServ.insertRegProduc(name_prod, dat.originalname, dat.filename, dat.path, dat.size, id_user, type, keyGroup);
            if (i === 0 && resultInsert.id_imgProduc) {
                keyGroup = resultInsert.id_imgProduc;
            }
        }
        return 'Imagen subida exitosamente';
    }
    async imgproduc(idimge) {
        console.log('id=>');
        console.log(idimge);
        const result = await this.imagesServ.infoimgProduc(idimge);
        const result2 = await this.imagesServ.infoimgProduc2(idimge);
        const info = [].concat(...result, ...result2);
        return info;
    }
};
exports.GaleryController = GaleryController;
__decorate([
    (0, common_1.Get)('/infoImg'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GaleryController.prototype, "events", null);
__decorate([
    (0, common_1.Post)('/insertphoto'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: 'files/images1',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GaleryController.prototype, "insertphoto", null);
__decorate([
    (0, common_1.Post)('/insertphotoUser'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: 'files/users',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)('iduser')),
    __param(1, (0, common_1.Body)('type')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], GaleryController.prototype, "insertphotoUser", null);
__decorate([
    (0, common_1.Get)('/infoImgUser'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GaleryController.prototype, "imguser", null);
__decorate([
    (0, common_1.Post)('/insertphotoProd'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: 'files/produc',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)('namProd')),
    __param(1, (0, common_1.Body)('iduser')),
    __param(2, (0, common_1.Body)('type')),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Array]),
    __metadata("design:returntype", Promise)
], GaleryController.prototype, "insertphotoProd", null);
__decorate([
    (0, common_1.Get)('/infoImgProdus'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GaleryController.prototype, "imgproduc", null);
exports.GaleryController = GaleryController = __decorate([
    (0, common_1.Controller)('chImages'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], GaleryController);
//# sourceMappingURL=images.controller.js.map