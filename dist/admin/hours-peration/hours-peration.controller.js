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
exports.HoursOperationController = void 0;
const common_1 = require("@nestjs/common");
const hours_peration_service_1 = require("./hours-peration.service");
const create_hours_peration_dto_1 = require("./dto/create-hours-peration.dto");
const update_hours_peration_dto_1 = require("./dto/update-hours-peration.dto");
const decorators_1 = require("../../auth/decorators");
const types_1 = require("../../common/glob/types");
let HoursOperationController = class HoursOperationController {
    constructor(hoursOperationService) {
        this.hoursOperationService = hoursOperationService;
    }
    create(createHoursOperationDto) {
        return this.hoursOperationService.create(createHoursOperationDto);
    }
    findByStore(id) {
        return this.hoursOperationService.findByStore(id);
    }
    update(id, updateHoursOperationDto) {
        return this.hoursOperationService.update(id, updateHoursOperationDto);
    }
};
exports.HoursOperationController = HoursOperationController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hours_peration_dto_1.CreateHoursOperationDto]),
    __metadata("design:returntype", void 0)
], HoursOperationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('store/:id'),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HoursOperationController.prototype, "findByStore", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_hours_peration_dto_1.UpdateHoursOperationDto]),
    __metadata("design:returntype", void 0)
], HoursOperationController.prototype, "update", null);
exports.HoursOperationController = HoursOperationController = __decorate([
    (0, common_1.Controller)('admin/hours-operation'),
    __metadata("design:paramtypes", [hours_peration_service_1.HoursOperationService])
], HoursOperationController);
//# sourceMappingURL=hours-peration.controller.js.map