import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Credit {

    @PrimaryGeneratedColumn('increment')
    id: number;

    //Monto que el repartidor recargo a su balance
    @Column('float', { default: 0, comment: 'Amount that the delivery person charged to your balance sheet' })
    amount: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.credits,
        { onDelete: "SET NULL" }
    )
    deliveryman: User;
}
