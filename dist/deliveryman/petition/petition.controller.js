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
exports.PetitionController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../auth/decorators");
const user_entity_1 = require("../../auth/entities/user.entity");
const types_1 = require("../../common/glob/types");
const petition_service_1 = require("./petition.service");
const collect_petition_dto_1 = require("./dto/collect-petition.dto");
const activate_petition_dto_1 = require("./dto/activate-petition.dto");
const find_petitions_dto_1 = require("./dto/find-petitions.dto");
let PetitionController = class PetitionController {
    constructor(petitionService) {
        this.petitionService = petitionService;
    }
    findNearPetitions(findPetitionsDto, user) {
        return this.petitionService.findNearPetitions(user, findPetitionsDto);
    }
    findPetition(orderId, user) {
        return this.petitionService.findPetition(user, orderId);
    }
    history(orderedAt, user) {
        return this.petitionService.history(user, orderedAt);
    }
    apply(orderId, user) {
        return this.petitionService.apply(orderId, user);
    }
    collect(orderId, user) {
        return this.petitionService.collect(orderId, user);
    }
    deliver(orderId, user, collectPetitonDto) {
        return this.petitionService.deliver(orderId, user, collectPetitonDto);
    }
    cancel(orderId, user) {
        return this.petitionService.cancel(orderId, user);
    }
    activate(user, activatePetitionDto) {
        return this.petitionService.activate(activatePetitionDto, user);
    }
};
exports.PetitionController = PetitionController;
__decorate([
    (0, common_1.Get)('near'),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_petitions_dto_1.FindPetitionsDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "findNearPetitions", null);
__decorate([
    (0, common_1.Get)('id/:orderId'),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "findPetition", null);
__decorate([
    (0, common_1.Get)('ordered-at/:orderedAt'),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman),
    __param(0, (0, common_1.Param)('orderedAt')),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "history", null);
__decorate([
    (0, common_1.Patch)('apply/:orderId'),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "apply", null);
__decorate([
    (0, common_1.Patch)('collect/:orderId'),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "collect", null);
__decorate([
    (0, common_1.Patch)('deliver/:orderId'),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        collect_petition_dto_1.CollectPetitonDto]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "deliver", null);
__decorate([
    (0, common_1.Patch)('cancel/:orderId'),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "cancel", null);
__decorate([
    (0, common_1.Patch)('activate'),
    (0, decorators_1.Auth)(types_1.TypesRol.deliveryman),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        activate_petition_dto_1.ActivatePetitionDto]),
    __metadata("design:returntype", void 0)
], PetitionController.prototype, "activate", null);
exports.PetitionController = PetitionController = __decorate([
    (0, common_1.Controller)('deliveryman/petition'),
    __metadata("design:paramtypes", [petition_service_1.PetitionService])
], PetitionController);
//# sourceMappingURL=petition.controller.js.map