"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const addressprofile_entity_1 = require("./entities/addressprofile.entity");
const datausers_entity_1 = require("./entities/datausers.entity");
const infousers_controller_1 = require("./infousers.controller");
const infousers_service_1 = require("./infousers.service");
let DataUsersModule = class DataUsersModule {
};
exports.DataUsersModule = DataUsersModule;
exports.DataUsersModule = DataUsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [infousers_controller_1.dataUsersController],
        providers: [infousers_service_1.datausersServices],
        imports: [typeorm_1.TypeOrmModule.forFeature([datausers_entity_1.datausersEntity, addressprofile_entity_1.addres_profileEntity])],
    })
], DataUsersModule);
//# sourceMappingURL=infousers.module.js.map