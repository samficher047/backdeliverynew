"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationWsModule = void 0;
const common_1 = require("@nestjs/common");
const location_ws_service_1 = require("./location-ws.service");
const location_ws_gateway_1 = require("./location-ws.gateway");
const auth_module_1 = require("../auth/auth.module");
const session_entity_1 = require("../auth/entities/session.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
let LocationWsModule = class LocationWsModule {
};
exports.LocationWsModule = LocationWsModule;
exports.LocationWsModule = LocationWsModule = __decorate([
    (0, common_1.Module)({
        providers: [location_ws_gateway_1.LocationWsGateway, location_ws_service_1.LocationWsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, session_entity_1.Session]), auth_module_1.AuthModule]
    })
], LocationWsModule);
//# sourceMappingURL=location-ws.module.js.map