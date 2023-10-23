
import { Store } from "src/admin/store/entities/store.entity";
import { User } from "src/auth/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/common/interfaces/location.interface";
import { Chat } from '../../../chat/entities/chat.entity';
import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { StatusOrder } from '../../../common/glob/status';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('increment')
    @IsPositive()
    id: number;

    @Column('text')
    note: string

    @Column('text')
    address: string;

    @Column('smallint', { default: StatusOrder.STARTED })
    status: number;

    @Column('float', { nullable: true })
    scoreDeliveryman: number;

    @Column('float', { nullable: true })
    scoreClient: number;

    @Column('json')
    products: JSON;

    @Column('float')
    @IsNumber()
    @IsOptional()
    deliveryFee: number;

    @Column('float')
    @IsOptional()
    @IsNumber()
    total: number;

    //Beneficio del repartido por el envío.
    @Column('float', { nullable: true, comment: 'Profit the deliveryman by the shipment' })
    deliverymanProfit: number;

    //Beneficio del app por el envío.
    @Column('float', { nullable: true, comment: 'Profit the app by the shipment' })
    deliveryAppProfit: number;

    @Column('int', { comment: 'Types Payment' })
    payment: number;

    @Column("point")
    @Index({ spatial: true })
    location: Location | string;

    @Column('float', { default: 0 })
    notificationsDeliveryman: number;

    @Column('float', { default: 0 })
    notificationsClient: number;

    //Date in the client's time zone.
    @Column("date")
    @Index()
    orderedAt: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(
        () => Store,
        (store) => store.orders,
        { onDelete: 'CASCADE', nullable: false }
    )
    store: Store;

    @ManyToOne(
        () => User,
        (user) => user.orders,
        { onDelete: "SET NULL", nullable: false }
    )
    user: User;

    @ManyToOne(
        () => User,
        (user) => user.orders,
        { onDelete: "SET NULL", nullable: true }
    )
    deliveryman: User;

    @BeforeInsert()
    @BeforeUpdate()
    checkLocation() {
        this.location = `${this.location['x']}, ${this.location['y']}`
    }

    @OneToMany(
        () => Chat,
        (chat) => chat.order,
        { cascade: true, eager: false }
    )
    chats?: Chat[];
}