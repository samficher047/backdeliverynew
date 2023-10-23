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
exports.LocationWsService = void 0;
const error_db_exception_1 = require("../common/exceptions/error.db.exception");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("../auth/entities/session.entity");
let LocationWsService = class LocationWsService {
    constructor(userRepository, sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.logger = new common_1.Logger('LocationWsService');
    }
    async registerUser(socket, idUser) {
        const user = await this.userRepository.findOneBy({ id: idUser });
        if (!user || !user.isActive)
            throw new Error('User denied permissions to access');
        socket['isAuth'] = true;
    }
    async updateLocation(idUser, data) {
        try {
            this.sessionRepository.createQueryBuilder('s')
                .update({ location: `${data[0]}, ${data[1]}` })
                .where({ user: { id: idUser } })
                .execute();
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
};
exports.LocationWsService = LocationWsService;
exports.LocationWsService = LocationWsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LocationWsService);
//# sourceMappingURL=location-ws.service.js.map