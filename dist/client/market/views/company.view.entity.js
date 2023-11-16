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
exports.ViewCompany = void 0;
const location_interface_1 = require("../../../common/interfaces/location.interface");
const typeorm_1 = require("typeorm");
const query = `
    SELECT c.id, s.id AS "storeId", s.name, s.address, s.contact, c.image, s.location, 
    cc."categoryId", ho.open, ho.close, ho."day", 
    ( (NOW() + ("timeZone" ||' H')::INTERVAL)::TIME > ho.open AND  (NOW() + ("timeZone" ||' H')::INTERVAL)::TIME < ho.close) AS "isOpen"
	FROM public.company AS c 
    INNER JOIN public.company_category AS cc ON cc."companyId" = c.id
    INNER JOIN public.store AS s ON s."companyId" = c.id
    INNER JOIN public.hours_operation AS ho ON ho."storeId" = s.id AND ho.day = EXTRACT(DOW FROM (NOW() + ("timeZone" ||' H')::INTERVAL));
    `;
let ViewCompany = class ViewCompany {
};
exports.ViewCompany = ViewCompany;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewCompany.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ViewCompany.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], ViewCompany.prototype, "isOpen", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewCompany.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewCompany.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewCompany.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewCompany.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewCompany.prototype, "open", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewCompany.prototype, "close", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ViewCompany.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", location_interface_1.Location)
], ViewCompany.prototype, "location", void 0);
exports.ViewCompany = ViewCompany = __decorate([
    (0, typeorm_1.ViewEntity)({
        schema: 'public',
        name: 'vw_company',
        expression: query,
    })
], ViewCompany);
//# sourceMappingURL=company.view.entity.js.map