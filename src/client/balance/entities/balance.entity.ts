import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../../auth/entities/user.entity';

@Entity()
export class Balance {

    @PrimaryColumn()
    userId: number;

    //Saldo de dinero que tiene el repartidor para poder tomar los pedidos
    @Column('float', { default: 0, comment: 'Balance of money the deliveryman has to be able to take orders' })
    balance: number;

    //Porcentaje del valor del envío. Beneficio para el repartidor
    //profit <= 1 AND profit >= 0
    @Column('float', { default: 0.85, comment: 'Percentage of the value of the shipment. Benefit for the deliveryman' })
    profit: number;

    //Importe a devolver al repartidor. Este valor aumenta cuando el repartidor acepta pedidos con pagos electrónicos
    @Column('float', { default: 0, comment: 'Amount to be returned to the deliveryman. This value increases when the deliveryman takes orders with electronic payments' })
    amount: number;

    //Dinero que el cliente tiene para realizar los pagos en la APP. 
    @Column('float', { default: 0, comment: 'Money that the client has to make payments in the APP.' })
    money: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.balances,
        { onDelete: "SET NULL" }
    )
    user: User;
}