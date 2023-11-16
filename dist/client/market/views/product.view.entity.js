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
exports.ViewProduct = void 0;
const typeorm_1 = require("typeorm");
const query = `
    SELECT p.id, p."companyId", cc.name AS "companyName", p.name, p.image, p.description, p.type, p.price
	FROM public.product AS p
    INNER JOIN public.company AS cc ON cc.id = p."companyId"
    `;
let ViewProduct = class ViewProduct {
};
exports.ViewProduct = ViewProduct;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'companyId' }),
    __metadata("design:type", Number)
], ViewProduct.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)({ name: 'companyName' }),
    __metadata("design:type", String)
], ViewProduct.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewProduct.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewProduct.prototype, "image", void 0);
exports.ViewProduct = ViewProduct = __decorate([
    (0, typeorm_1.ViewEntity)({
        schema: 'public',
        name: 'vw_product',
        expression: query,
    })
], ViewProduct);
//# sourceMappingURL=product.view.entity.js.map