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
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Session = class Session {
};
exports.Session = Session;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Session.prototype, "idDevice", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, unique: true }),
    __metadata("design:type", String)
], Session.prototype, "tokenPush", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: false, comment: 'If true. The deliveryman wants to receive orders' }),
    __metadata("design:type", Boolean)
], Session.prototype, "isOnline", void 0);
__decorate([
    (0, typeorm_1.Column)("point", { nullable: true }),
    (0, typeorm_1.Index)({ spatial: true }),
    __metadata("design:type", Object)
], Session.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Session.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Session.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sessions, { onDelete: 'CASCADE', nullable: false }),
    __metadata("design:type", user_entity_1.User)
], Session.prototype, "user", void 0);
exports.Session = Session = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["user", "idDevice"])
], Session);
//# sourceMappingURL=session.entity.js.map