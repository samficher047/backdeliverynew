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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const passport_jwt_1 = require("passport-jwt");
const error_1 = require("../../common/glob/error");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("../entities/session.entity");
const user_entity_1 = require("../entities/user.entity");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userRepository, sessionRepository) {
        super({
            secretOrKey: process.env.JWT_SECREAT,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }
    async validate(payload) {
        const { id, idDevice } = payload;
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.UnauthorizedException({ codeError: error_1.ErrorCode.UNAUTHORIZED, message: 'Token not valid' });
        if (!user.isActive)
            throw new common_1.UnauthorizedException({ codeError: error_1.ErrorCode.UNAUTHORIZED, message: 'User is inactive, talk with an admin' });
        const session = await this.sessionRepository.findOneBy({ user: { id: user.id }, idDevice });
        if (!session)
            throw new common_1.UnauthorizedException({ codeError: error_1.ErrorCode.UNAUTHORIZED, message: 'Session not valid' });
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map