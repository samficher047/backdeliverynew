"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoursOperationModule = void 0;
const common_1 = require("@nestjs/common");
const hours_peration_service_1 = require("./hours-peration.service");
const hours_peration_controller_1 = require("./hours-peration.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../../auth/auth.module");
const hours_peration_entity_1 = require("./entities/hours-peration.entity");
let HoursOperationModule = class HoursOperationModule {
};
exports.HoursOperationModule = HoursOperationModule;
exports.HoursOperationModule = HoursOperationModule = __decorate([
    (0, common_1.Module)({
        controllers: [hours_peration_controller_1.HoursOperationController],
        providers: [hours_peration_service_1.HoursOperationService],
        imports: [typeorm_1.TypeOrmModule.forFeature([hours_peration_entity_1.HoursOperation]), auth_module_1.AuthModule]
    })
], HoursOperationModule);
//# sourceMappingURL=hours-peration.module.js.map