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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const error_db_exception_1 = require("../common/exceptions/error.db.exception");
const error_1 = require("../common/glob/error");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("@nestjs/typeorm");
const email_service_1 = require("../email/email.service");
const session_entity_1 = require("./entities/session.entity");
const user_entity_1 = require("./entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, sessionRepository, emailServiceService, jwtService) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.emailServiceService = emailServiceService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('AuthService');
    }
    async google(googleUserDto) {
        const { email, idGoogle, tokenPush, idDevice } = googleUserDto;
        try {
            const response = await this.userRepository.createQueryBuilder('uss')
                .update({ idGoogle })
                .where({ email }).execute();
            let user;
            if (response.affected > 0) {
                user = await this.userRepository.findOne({
                    where: { email },
                    select: { image: true, email: true, password: true, id: true, roles: true, fullName: true, phone: true }
                });
            }
            else {
                user = this.userRepository.create({ ...googleUserDto, password: bcrypt.hashSync(Date().toString(), 1) });
                await this.userRepository.save(user);
            }
            await this._saveSession(user, idDevice, tokenPush);
            return { user: { ...user, token: this._getJwtToken({ id: user.id, email: user.email, idDevice }) } };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async register(createUserDto) {
        const { password, tokenPush, ...userData } = createUserDto;
        console.log("userData=>");
        console.log(userData);
        const verification = await this.userRepository.createQueryBuilder("us")
            .andWhere("(us.email = :emal OR us.phone = :phone)")
            .setParameters({ emal: userData.email, phone: userData.phone }).getOne();
        if (verification) {
            if (verification['email'] === userData.email) {
                throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.EMAILUNIQUE });
            }
            else if (verification['phone'] === userData.phone) {
                throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.PHONEUNIQUE });
            }
            else {
                throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.UNKNOWN });
            }
        }
        try {
            const user = this.userRepository.create({ ...userData, password: bcrypt.hashSync(password, 3) });
            console.log("user=>");
            console.log(user);
            await this.userRepository.save(user);
            await this._saveSession(user, userData.idDevice, tokenPush);
            delete user.password;
            const result1 = { user: { ...user, token: this._getJwtToken({ id: user.id, email: user.email, idDevice: userData.idDevice }) } };
            return { user: { ...user, token: this._getJwtToken({ id: user.id, email: user.email, idDevice: userData.idDevice }) } };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async updateregister(id, rol) {
        const datosbase1 = await this.userRepository.update({ id: id }, {
            roles: [rol],
        });
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<registro actualizado de zona>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(datosbase1);
        return datosbase1;
    }
    async inforegister(date) {
        console.log(date);
        const datosbase2 = await this.userRepository.find({
            where: {
                id: date,
            },
        });
        return datosbase2;
    }
    async login(loginUserDto) {
        const { password, email, idDevice, tokenPush } = loginUserDto;
        const user = await this.userRepository
            .findOne({
            where: { email },
            select: { image: true, email: true, password: true, passwordTemporary: true, id: true, roles: true, fullName: true, phone: true }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('UnauthorizedException');
        }
        if (!bcrypt.compareSync(password, user.password) && !bcrypt.compareSync(password, user.passwordTemporary)) {
            throw new common_1.UnauthorizedException('UnauthorizedException');
        }
        await this._saveSession(user, idDevice, tokenPush);
        delete user.password;
        delete user.passwordTemporary;
        return { ...user, token: this._getJwtToken({ id: user.id, email: user.email, idDevice }) };
    }
    async checkStatus(user, idDevice) {
        const session = await this.sessionRepository
            .findOne({ where: { user: { id: user.id }, idDevice }, select: { id: true } });
        if (session)
            return { user };
        else
            throw new common_1.UnauthorizedException({ codeError: error_1.ErrorCode.UNAUTHORIZED });
    }
    async updateTokenPush(user, updateTokenPushDto) {
        const { idDevice, tokenPush } = updateTokenPushDto;
        try {
            await this.sessionRepository.createQueryBuilder()
                .update({ tokenPush })
                .where({ user, idDevice }).execute();
            return { updateTokenPush: true };
            ;
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async logOut(user, idDevice) {
        await this.sessionRepository.delete({ user: { id: user.id }, idDevice });
        return { logOut: true };
    }
    async update(user, updateUserDto) {
        const verification = await this.userRepository.createQueryBuilder("us")
            .andWhere("(us.email = :emal OR us.phone = :phone) AND us.id != :userId")
            .setParameters({ emal: updateUserDto.email, phone: updateUserDto.phone, userId: user.id }).getOne();
        if (verification) {
            if (verification['email'] === updateUserDto.email) {
                throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.EMAILUNIQUE });
            }
            else if (verification['phone'] === updateUserDto.phone) {
                throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.PHONEUNIQUE });
            }
            else {
                throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.UNKNOWN });
            }
        }
        try {
            const userUpdate = await this.userRepository.preload({ id: user.id, ...updateUserDto });
            if (userUpdate) {
                await this.userRepository.save(userUpdate);
                delete userUpdate.password;
                delete userUpdate.passwordTemporary;
                return { user: { ...userUpdate } };
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async updatePasswor(user, passwordUserDto) {
        const { password } = passwordUserDto;
        try {
            const userUpdate = await this.userRepository.preload({ id: user.id, password: bcrypt.hashSync(password, 3) });
            if (userUpdate) {
                await this.userRepository.save(userUpdate);
                delete userUpdate.password;
                delete userUpdate.passwordTemporary;
                return { user: { ...userUpdate } };
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async recoverAccount(email) {
        const passwordTemporary = this._generatePassword();
        try {
            const response = await this.userRepository.createQueryBuilder('uss')
                .update({ passwordTemporary: bcrypt.hashSync(passwordTemporary, 3) })
                .where({ email }).execute();
            if (response.affected > 0) {
                const user = await this.userRepository.findOne({ where: { email }, select: { id: true, fullName: true } });
                this.emailServiceService.sendPassword(user.fullName, email, passwordTemporary);
                return { recover: true };
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.BadRequestException({ codeError: error_1.ErrorCode.ACCOUNTNOTEXIST });
    }
    _getJwtToken(jwtpayload) {
        return this.jwtService.sign(jwtpayload);
    }
    async _saveSession(user, idDevice, tokenPush) {
        if (tokenPush)
            await this.sessionRepository.delete({ tokenPush });
        await this.sessionRepository.delete({ user: { id: user.id }, idDevice: idDevice });
        const session = this.sessionRepository.create({ user, idDevice, tokenPush });
        await this.sessionRepository.save(session);
    }
    _generatePassword() {
        const numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let clave = '';
        for (let i = 0; i < 6; i++)
            clave += numbers1[Math.floor(Math.random() * numbers1.length)];
        return (clave);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(session_entity_1.Session)),
    __param(2, (0, common_1.Inject)(email_service_1.EmailService)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        email_service_1.EmailService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map