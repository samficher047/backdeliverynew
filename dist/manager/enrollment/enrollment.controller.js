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
exports.EnrollmentController = void 0;
const common_1 = require("@nestjs/common");
const enrollment_service_1 = require("./enrollment.service");
const create_enrollment_dto_1 = require("./dto/create-enrollment.dto");
const user_entity_1 = require("../../auth/entities/user.entity");
const decorators_1 = require("../../auth/decorators");
let EnrollmentController = class EnrollmentController {
    constructor(enrollmentService) {
        this.enrollmentService = enrollmentService;
    }
    create(user, createEnrollmentDto) {
        return this.enrollmentService.create(user, createEnrollmentDto);
    }
    getCategories() {
        return this.enrollmentService.getCategories();
    }
};
exports.EnrollmentController = EnrollmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_enrollment_dto_1.CreateEnrollmentDto]),
    __metadata("design:returntype", void 0)
], EnrollmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get-categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnrollmentController.prototype, "getCategories", null);
exports.EnrollmentController = EnrollmentController = __decorate([
    (0, common_1.Controller)('manager/enrollment'),
    __metadata("design:paramtypes", [enrollment_service_1.EnrollmentService])
], EnrollmentController);
//# sourceMappingURL=enrollment.controller.js.map