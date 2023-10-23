import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from 'src/auth/entities/user.entity';
import { Order } from '../../client/market/entities/order.entity';

@Entity()
export class Chat {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    message: string;

    @Column('smallint')
    type: number;

    @Column('smallint', { default: 1 })
    status: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.chatsFrom,
        { onDelete: 'CASCADE', nullable: false }
    )
    from: User;

    @ManyToOne(
        () => User,
        (user) => user.chatsTo,
        { onDelete: 'CASCADE', nullable: true }
    )
    to: User;

    @ManyToOne(
        () => Order,
        (order) => order.chats,
        { onDelete: 'CASCADE', nullable: false }
    )
    order: Order;
}
