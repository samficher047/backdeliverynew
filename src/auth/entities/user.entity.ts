import { IsPositive } from "class-validator";
import { Balance } from "src/client/balance/entities/balance.entity";
import { Store } from "src/admin/store/entities/store.entity";
import { Session } from "src/auth/entities/session.entity";
import { Address } from "src/client/address/entities/address.entity";
import { Order } from "src/client/market/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from '../../admin/product/entities/product.entity';
import { Chat } from '../../chat/entities/chat.entity';
import { Company } from "src/admin/company/entities/company.entity";
import { Payment } from "src/client/payments/entities/payment.entity";
import { Credit } from "src/admin/credit/entities/credit.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    @IsPositive()
    id: number;

    @Column('text', { unique: true, nullable: true })
    idGoogle: string;

    @Column('text')
    fullName: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { unique: true, nullable: true })
    phone: string;

    @Column('text', { select: false })
    password: string;

    @Column('text', { select: false, nullable: true })
    passwordTemporary: string;

    @Column('text', { default: '' })
    image: string;

    @Column('bool', { default: true })
    isActive: boolean;

    @Column('text', { array: true, default: ['client'] })
    roles: string[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(
        () => Product,
        (products) => products.company,
        { cascade: true, eager: false }
    )
    products?: Product[];

    @OneToMany(
        () => Company,
        (company) => company.user,
        { cascade: true, eager: false }
    )
    companies?: Company[];

    @OneToMany(
        () => Store,
        (store) => store.user,
        { cascade: true, eager: false }
    )
    stores?: Store[];

    @OneToMany(
        () => Balance,
        (balance) => balance.user,
        { cascade: true, eager: false }
    )
    balances?: Balance[];

    @OneToMany(
        () => Credit,
        (credit) => credit.deliveryman,
        { cascade: true, eager: false }
    )
    credits?: Credit[];

    @OneToMany(
        () => Address,
        (address) => address.user,
        { cascade: true, eager: true }
    )
    addresses?: Store[];

    @OneToMany(
        () => Payment,
        (payment) => payment.user,
        { cascade: true, eager: false }
    )
    payments?: Store[];

    @OneToMany(
        () => Order,
        (order) => order.user,
        { cascade: true, eager: false }
    )
    orders?: Order[];

    @OneToMany(
        () => Chat,
        (chat) => chat.from,
        { cascade: true, eager: false }
    )
    chatsFrom?: Chat[];

    @OneToMany(
        () => Chat,
        (chat) => chat.to,
        { cascade: true, eager: false }
    )
    chatsTo?: Chat[];

    @OneToMany(
        () => Session,
        (session) => session.user,
        { cascade: true, eager: false }
    )
    sessions?: Session[];
}
