"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images1Module = void 0;
const auth_module_1 = require("../auth/auth.module");
const dealers_entity_1 = require("./entities/dealers.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../client/market/entities/order.entity");
const images_entity_1 = require("./entities/images.entity");
const imagesUsers_entity_1 = require("./entities/imagesUsers.entity");
const imgProduc_entity_1 = require("./entities/imgProduc.entity");
const images_controller_1 = require("./images.controller");
const images_service_1 = require("./images.service");
let Images1Module = class Images1Module {
};
exports.Images1Module = Images1Module;
exports.Images1Module = Images1Module = __decorate([
    (0, common_1.Module)({
        controllers: [images_controller_1.GaleryController],
        providers: [images_service_1.ImagesService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                order_entity_1.Order,
                images_entity_1.entityimages1,
                imagesUsers_entity_1.entityimagesUser,
                imgProduc_entity_1.entityimagesProduc,
                dealers_entity_1.entityimagesDealers,
            ]),
            auth_module_1.AuthModule,
        ],
    })
], Images1Module);
//# sourceMappingURL=images.module.js.map