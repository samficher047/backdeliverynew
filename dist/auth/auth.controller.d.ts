import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';
import { UpdateTokenPushDto } from './dto/update-token-push.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
            sessions?: import("./entities/session.entity").Session[];
        };
    }>;
    recoverAccount(email: string): Promise<{
        recover: boolean;
    }>;
    register(createUserDto: CreateUserDto): Promise<any>;
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
            sessions?: import("./entities/session.entity").Session[];
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
            sessions?: import("./entities/session.entity").Session[];
        };
    }>;
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
        sessions?: import("./entities/session.entity").Session[];
    }>;
    checkStatus(user: User, idDevice: string): Promise<{
        user: User;
    }>;
    updateTokenPush(updateTokenPushDto: UpdateTokenPushDto, user: User): Promise<{
        updateTokenPush: boolean;
    }>;
    logOut(user: User, idDevice: string): Promise<{
        logOut: boolean;
    }>;
}
