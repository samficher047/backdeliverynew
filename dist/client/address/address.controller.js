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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../auth/decorators");
const address_service_1 = require("./address.service");
const create_address_dto_1 = require("./dto/create-address.dto");
const update_address_dto_1 = require("./dto/update-address.dto");
const user_entity_1 = require("../../auth/entities/user.entity");
const autocomplete_address_dto_1 = require("./dto/autocomplete-address.dto");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    create(user, createAddressDto) {
        return this.addressService.create(user, createAddressDto);
    }
    findAll(user) {
        return this.addressService.findAll(user);
    }
    update(user, id, updateAddressDto) {
        return this.addressService.update(id, updateAddressDto);
    }
    remove(user, id) {
        return this.addressService.remove(id);
    }
    autocomplete(autocompleteAddressDto, place) {
        return this.addressService.autocomplete(place, autocompleteAddressDto);
    }
    geocode(placeId) {
        return this.addressService.geocode(placeId);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Auth)(),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_address_dto_1.CreateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Auth)(),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorators_1.Auth)(),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, update_address_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorators_1.Auth)(),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('autocomplete/:place'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('place')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autocomplete_address_dto_1.AutocompleteAddressDto, String]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "autocomplete", null);
__decorate([
    (0, common_1.Get)('geocode/:placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "geocode", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.Controller)('client/address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map