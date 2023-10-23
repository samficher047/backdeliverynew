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
exports.RequestController = void 0;
const common_1 = require("@nestjs/common");
const request_service_1 = require("./request.service");
const decorators_1 = require("../../auth/decorators");
const types_1 = require("../../common/glob/types");
const user_entity_1 = require("../../auth/entities/user.entity");
let RequestController = class RequestController {
    constructor(requestService) {
        this.requestService = requestService;
    }
    findNearRequests(user) {
        return this.requestService.findNearRequests(user);
    }
    findRequest(orderId, user) {
        return this.requestService.findRequest(user, orderId);
    }
    history(orderedAt, user) {
        return this.requestService.history(user, orderedAt);
    }
};
exports.RequestController = RequestController;
__decorate([
    (0, common_1.Get)('near'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "findNearRequests", null);
__decorate([
    (0, common_1.Get)('id/:orderId'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "findRequest", null);
__decorate([
    (0, common_1.Get)('ordered-at/:orderedAt'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, common_1.Param)('orderedAt')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "history", null);
exports.RequestController = RequestController = __decorate([
    (0, common_1.Controller)('manager/request'),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], RequestController);
//# sourceMappingURL=request.controller.js.map