import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Company } from "src/admin/company/entities/company.entity";
import { Location } from "src/common/interfaces/location.interface";
import { User } from "src/auth/entities/user.entity";
import { Order } from "src/client/market/entities/order.entity";
import { HoursOperation } from "src/admin/hours-peration/entities/hours-peration.entity";
import { IsPositive } from "class-validator";

@Entity()
export class Store {

    @PrimaryGeneratedColumn('increment')
    @IsPositive()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    address: string;

    @Column('text')
    contact: string;

    @Column('text')
    email: string;

    @Column('float', { default: 1.25 })
    startupCost: number;

    @Column('float', { default: 0.55 })
    costKm: number;

    @Column("point")
    @Index({ spatial: true })
    location: Location | string;

    @Column("int", { default: 0 })
    sales: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt?: Date;

    @OneToMany(
        () => Order,
        (order) => order.store,
        { cascade: true, eager: false }
    )
    orders?: Order[];

    @ManyToOne(
        () => Company,
        (company) => company.stores,
        { onDelete: 'CASCADE' }
    )
    company: Company;

    @ManyToOne(
        () => User,
        (user) => user.stores,
        { onDelete: "SET NULL" }
    )
    user: User;

    @OneToMany(
        () => HoursOperation,
        (hoursOperation) => hoursOperation.store,
        { cascade: true, eager: false }
    )
    hoursOperations?: HoursOperation[];

    @BeforeInsert()
    @BeforeUpdate()
    checkLocation() {
        this.location = `${this.location['x']}, ${this.location['y']}`
    }

}
