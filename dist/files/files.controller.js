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
exports.filesController = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const files_service_1 = require("./files.service");
const rutefiles = 'files/files';
let filesController = class filesController {
    constructor(setServicesFiles) {
        this.setServicesFiles = setServicesFiles;
    }
    async setinfoHotel(Numcase) {
        const result = await this.setServicesFiles.infoFiles(Numcase);
        return result;
    }
    async insertphoto(date, file) {
        if (!date || !file) {
            return 'Faltan datos requeridos.';
        }
        const resultInsert = await this.setServicesFiles.insertReg(date, file.originalname, file.filename, rutefiles);
        return resultInsert;
    }
    async insertfiles(date, files) {
        if (!date || !files || files.length === 0) {
            return 'Faltan datos requeridos o archivos.';
        }
        const resultsInsert = await Promise.all(files.map(async (file) => {
            const resultInsert = await this.setServicesFiles.insertReg(date, file.originalname, file.filename, rutefiles);
            return resultInsert;
        }));
        return resultsInsert;
    }
    async setfilesforuser(Numcase) {
        const result = await this.setServicesFiles.infofilesofUser(Numcase);
        return result;
    }
    async deletefile(Numcase) {
        const result = await this.setServicesFiles.deletefile(Numcase);
        return result;
    }
};
exports.filesController = filesController;
__decorate([
    (0, common_1.Post)("/infotest"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], filesController.prototype, "setinfoHotel", null);
__decorate([
    (0, common_1.Post)('/upfile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: rutefiles,
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)('date')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], filesController.prototype, "insertphoto", null);
__decorate([
    (0, common_1.Post)('/upfiles'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: rutefiles,
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], filesController.prototype, "insertfiles", null);
__decorate([
    (0, common_1.Get)("/infofilesforuser"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], filesController.prototype, "setfilesforuser", null);
__decorate([
    (0, common_1.Get)("/deletefile"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], filesController.prototype, "deletefile", null);
exports.filesController = filesController = __decorate([
    (0, common_1.Controller)("files"),
    __metadata("design:paramtypes", [files_service_1.FilesServices])
], filesController);
//# sourceMappingURL=files.controller.js.map