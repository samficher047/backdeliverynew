import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';
import { UpdateTokenPushDto } from './dto/update-token-push.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Session } from './entities/session.entity';
import { User } from './entities/user.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly sessionRepository;
    private readonly emailServiceService;
    private readonly jwtService;
    private readonly logger;
    constructor(userRepository: Repository<User>, sessionRepository: Repository<Session>, emailServiceService: EmailService, jwtService: JwtService);
    google(googleUserDto: GoogleUserDto): Promise<{
        user: {
            token: string;
            id: number;
            idGoogle: string;
            fullName: string;
            email: string;
            phone: string;
            password: string;
            passwordTemporary: string;
            image: string;
            isActive: boolean;
            roles: string[];
            createdAt: Date;
            updatedAt: Date;
            products?: import("../admin/product/entities/product.entity").Product[];
            companies?: import("../admin/company/entities/company.entity").Company[];
            stores?: import("../admin/store/entities/store.entity").Store[];
            balances?: import("../client/balance/entities/balance.entity").Balance[];
            credits?: import("../admin/credit/entities/credit.entity").Credit[];
            addresses?: import("../admin/store/entities/store.entity").Store[];
            payments?: import("../admin/store/entities/store.entity").Store[];
            orders?: import("../client/market/entities/order.entity").Order[];
            chatsFrom?: import("../chat/entities/chat.entity").Chat[];
            chatsTo?: import("../chat/entities/chat.entity").Chat[];
            sessions?: Session[];
        };
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        user: {
            token: string;
            id: number;
            idGoogle: string;
            fullName: string;
            email: string;
            phone: string;
            password: string;
            passwordTemporary: string;
            image: string;
            isActive: boolean;
            roles: string[];
            createdAt: Date;
            updatedAt: Date;
            products?: import("../admin/product/entities/product.entity").Product[];
            companies?: import("../admin/company/entities/company.entity").Company[];
            stores?: import("../admin/store/entities/store.entity").Store[];
            balances?: import("../client/balance/entities/balance.entity").Balance[];
            credits?: import("../admin/credit/entities/credit.entity").Credit[];
            addresses?: import("../admin/store/entities/store.entity").Store[];
            payments?: import("../admin/store/entities/store.entity").Store[];
            orders?: import("../client/market/entities/order.entity").Order[];
            chatsFrom?: import("../chat/entities/chat.entity").Chat[];
            chatsTo?: import("../chat/entities/chat.entity").Chat[];
            sessions?: Session[];
        };
    }>;
    updateregister(id: any, rol: any): Promise<any>;
    inforegister(date: any): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        id: number;
        idGoogle: string;
        fullName: string;
        email: string;
        phone: string;
        password: string;
        passwordTemporary: string;
        image: string;
        isActive: boolean;
        roles: string[];
        createdAt: Date;
        updatedAt: Date;
        products?: import("../admin/product/entities/product.entity").Product[];
        companies?: import("../admin/company/entities/company.entity").Company[];
        stores?: import("../admin/store/entities/store.entity").Store[];
        balances?: import("../client/balance/entities/balance.entity").Balance[];
        credits?: import("../admin/credit/entities/credit.entity").Credit[];
        addresses?: import("../admin/store/entities/store.entity").Store[];
        payments?: import("../admin/store/entities/store.entity").Store[];
        orders?: import("../client/market/entities/order.entity").Order[];
        chatsFrom?: import("../chat/entities/chat.entity").Chat[];
        chatsTo?: import("../chat/entities/chat.entity").Chat[];
        sessions?: Session[];
    }>;
    checkStatus(user: User, idDevice: string): Promise<{
        user: User;
    }>;
    updateTokenPush(user: User, updateTokenPushDto: UpdateTokenPushDto): Promise<{
        updateTokenPush: boolean;
    }>;
    logOut(user: User, idDevice: string): Promise<{
        logOut: boolean;
    }>;
    update(user: User, updateUserDto: UpdateUserDto): Promise<{
        user: {
            id: number;
            idGoogle: string;
            fullName: string;
            email: string;
            phone: string;
            password: string;
            passwordTemporary: string;
            image: string;
            isActive: boolean;
            roles: string[];
            createdAt: Date;
            updatedAt: Date;
            products?: import("../admin/product/entities/product.entity").Product[];
            companies?: import("../admin/company/entities/company.entity").Company[];
            stores?: import("../admin/store/entities/store.entity").Store[];
            balances?: import("../client/balance/entities/balance.entity").Balance[];
            credits?: import("../admin/credit/entities/credit.entity").Credit[];
            addresses?: import("../admin/store/entities/store.entity").Store[];
            payments?: import("../admin/store/entities/store.entity").Store[];
            orders?: import("../client/market/entities/order.entity").Order[];
            chatsFrom?: import("../chat/entities/chat.entity").Chat[];
            chatsTo?: import("../chat/entities/chat.entity").Chat[];
            sessions?: Session[];
        };
    }>;
    updatePasswor(user: User, passwordUserDto: PasswordUserDto): Promise<{
        user: {
            id: number;
            idGoogle: string;
            fullName: string;
            email: string;
            phone: string;
            password: string;
            passwordTemporary: string;
            image: string;
            isActive: boolean;
            roles: string[];
            createdAt: Date;
            updatedAt: Date;
            products?: import("../admin/product/entities/product.entity").Product[];
            companies?: import("../admin/company/entities/company.entity").Company[];
            stores?: import("../admin/store/entities/store.entity").Store[];
            balances?: import("../client/balance/entities/balance.entity").Balance[];
            credits?: import("../admin/credit/entities/credit.entity").Credit[];
            addresses?: import("../admin/store/entities/store.entity").Store[];
            payments?: import("../admin/store/entities/store.entity").Store[];
            orders?: import("../client/market/entities/order.entity").Order[];
            chatsFrom?: import("../chat/entities/chat.entity").Chat[];
            chatsTo?: import("../chat/entities/chat.entity").Chat[];
            sessions?: Session[];
        };
    }>;
    recoverAccount(email: string): Promise<{
        recover: boolean;
    }>;
    private _getJwtToken;
    private _saveSession;
    private _generatePassword;
}
