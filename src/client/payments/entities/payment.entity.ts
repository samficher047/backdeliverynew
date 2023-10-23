import { User } from "src/auth/entities/user.entity";
import { StatusPayment } from "src/common/glob/status";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Payment {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('float')
    money: number;

    @Column('smallint', { default: StatusPayment.STARTED })
    status: number;

    @Column('text')
    currency: string;

    @Column('json')
    products: JSON;

    @Column('json')
    response: JSON;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.payments,
        { onDelete: "SET NULL" }
    )
    user: User;
}
