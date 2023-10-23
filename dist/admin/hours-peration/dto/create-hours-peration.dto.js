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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHoursOperationDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const store_entity_1 = require("../../store/entities/store.entity");
class CreateHoursOperationDto {
}
exports.CreateHoursOperationDto = CreateHoursOperationDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([1, 2, 3, 4, 5, 6, 0]),
    __metadata("design:type", Number)
], CreateHoursOperationDto.prototype, "day", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateHoursOperationDto.prototype, "open", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateHoursOperationDto.prototype, "close", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => store_entity_1.Store),
    __metadata("design:type", store_entity_1.Store)
], CreateHoursOperationDto.prototype, "store", void 0);
//# sourceMappingURL=create-hours-peration.dto.js.map