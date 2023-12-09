"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingDataModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const landingpage_controller_1 = require("./landingpage.controller");
const landingpage_service_1 = require("./landingpage.service");
const landingdata_entity_1 = require("./entities/landingdata.entity");
let LandingDataModule = class LandingDataModule {
};
exports.LandingDataModule = LandingDataModule;
exports.LandingDataModule = LandingDataModule = __decorate([
    (0, common_1.Module)({
        controllers: [landingpage_controller_1.LandingDataController],
        providers: [landingpage_service_1.LandingDataService],
        imports: [typeorm_1.TypeOrmModule.forFeature([landingdata_entity_1.landingdata])],
    })
], LandingDataModule);
//# sourceMappingURL=landingpage.module.js.map