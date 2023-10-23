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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
const create_store_dto_1 = require("./dto/create-store.dto");
const update_store_dto_1 = require("./dto/update-store.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const types_1 = require("../../common/glob/types");
const decorators_1 = require("../../auth/decorators");
const user_entity_1 = require("../../auth/entities/user.entity");
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    create(createStoreDto, user) {
        return this.storeService.create(user, createStoreDto);
    }
    findByCompany(companyId, paginationDto) {
        return this.storeService.findByCompany(companyId, paginationDto);
    }
    update(id, updateStoreDto) {
        return this.storeService.update(id, updateStoreDto);
    }
    remove(id) {
        return this.storeService.remove(id);
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('company/:companyId'),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "findByCompany", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_store_dto_1.UpdateStoreDto]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Auth)(types_1.TypesRol.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "remove", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('admin/store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map