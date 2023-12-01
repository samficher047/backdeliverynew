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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("./decorators/auth.decorator");
const get_user_decorator_1 = require("./decorators/get-user.decorator");
const create_user_dto_1 = require("./dto/create-user.dto");
const google_user_dto_1 = require("./dto/google-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const password_user_dto_1 = require("./dto/password-user.dto");
const update_token_push_dto_1 = require("./dto/update-token-push.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
const auth_service_1 = require("./auth.service");
const usersCodes_service_1 = require("../users_codes/usersCodes.service");
let AuthController = class AuthController {
    constructor(authService, infoUsers) {
        this.authService = authService;
        this.infoUsers = infoUsers;
    }
    google(googleUserDto) {
        return this.authService.google(googleUserDto);
    }
    recoverAccount(email) {
        return this.authService.recoverAccount(email);
    }
    async register(createUserDto) {
        const result1 = await this.authService.register(createUserDto);
        const result2 = await this.authService.updateregister(result1.user.id, createUserDto.rol);
        const resultcode = await this.infoUsers.GenerateCode(result1.user.id);
        const result3 = this.authService.inforegister(result1.user.id);
        console.log('result3');
        console.log(result3);
        return {
            user: {
                fullName: result1.user.fullName,
                email: result1.user.email,
                phone: result1.user.phone,
                idGoogle: result1.user.idGoogle,
                passwordTemporary: result1.user.passwordTemporary,
                id: result1.user.id,
                image: result1.user.image,
                isActive: result1.user.isActive,
                roles: [createUserDto.rol],
                createdAt: result1.user.createdAt,
                updatedAt: result1.user.updatedAt,
                token: result1.user.token,
            },
        };
    }
    update(user, updateUserDto) {
        return this.authService.update(user, updateUserDto);
    }
    updatePasswor(user, passwordUserDto) {
        return this.authService.updatePasswor(user, passwordUserDto);
    }
    login(loginUserDto) {
        return this.authService.login(loginUserDto);
    }
    checkStatus(user, idDevice) {
        return this.authService.checkStatus(user, idDevice);
    }
    updateTokenPush(updateTokenPushDto, user) {
        return this.authService.updateTokenPush(user, updateTokenPushDto);
    }
    logOut(user, idDevice) {
        return this.authService.logOut(user, idDevice);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('google'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_user_dto_1.GoogleUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "google", null);
__decorate([
    (0, common_1.Patch)('recover/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "recoverAccount", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('update-passwor'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        password_user_dto_1.PasswordUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updatePasswor", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Patch)('check/:idDevice'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idDevice', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkStatus", null);
__decorate([
    (0, common_1.Patch)('update-token-push'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_token_push_dto_1.UpdateTokenPushDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateTokenPush", null);
__decorate([
    (0, common_1.Delete)('log-out/:idDevice'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('idDevice', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logOut", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        usersCodes_service_1.users_CodesService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map