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
exports.StoreManagerController = void 0;
const common_1 = require("@nestjs/common");
const store_manager_service_1 = require("./store.manager.service");
const decorators_1 = require("../../auth/decorators");
const user_entity_1 = require("../../auth/entities/user.entity");
const types_1 = require("../../common/glob/types");
const create_product_dto_1 = require("../../admin/product/dto/create-product.dto");
const update_product_dto_1 = require("../../admin/product/dto/update-product.dto");
const update_hours_peration_dto_1 = require("../../admin/hours-peration/dto/update-hours-peration.dto");
let StoreManagerController = class StoreManagerController {
    constructor(managerService) {
        this.managerService = managerService;
    }
    companies(user) {
        return this.managerService.companies(user);
    }
    products(companyId) {
        return this.managerService.products(companyId);
    }
    create(createProductDto) {
        return this.managerService.createProduct(createProductDto);
    }
    update(id, updateProductDto) {
        return this.managerService.updateProduct(id, updateProductDto);
    }
    hours(id) {
        return this.managerService.hours(id);
    }
    updateHour(id, updateHoursOperationDto) {
        return this.managerService.updateHour(id, updateHoursOperationDto);
    }
};
exports.StoreManagerController = StoreManagerController;
__decorate([
    (0, common_1.Get)('companies'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], StoreManagerController.prototype, "companies", null);
__decorate([
    (0, common_1.Get)('products/:companyId'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreManagerController.prototype, "products", null);
__decorate([
    (0, common_1.Post)('product'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], StoreManagerController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('product/:id'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], StoreManagerController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('hours/:id'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreManagerController.prototype, "hours", null);
__decorate([
    (0, common_1.Patch)('hours/:id'),
    (0, decorators_1.Auth)(types_1.TypesRol.manager),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_hours_peration_dto_1.UpdateHoursOperationDto]),
    __metadata("design:returntype", void 0)
], StoreManagerController.prototype, "updateHour", null);
exports.StoreManagerController = StoreManagerController = __decorate([
    (0, common_1.Controller)('manager/store'),
    __metadata("design:paramtypes", [store_manager_service_1.StoreManagerService])
], StoreManagerController);
//# sourceMappingURL=store.manager.controller.js.map