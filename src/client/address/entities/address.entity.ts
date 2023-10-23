import { User } from "src/auth/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Location } from "src/common/interfaces/location.interface";

@Entity()
export class Address {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    alias: string;

    @Column('text')
    address: string;

    @Column("point")
    @Index({ spatial: true })
    location: Location | string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt?: Date;

    @ManyToOne(
        () => User,
        (user) => user.addresses,
        { onDelete: "SET NULL" }
    )
    user: User;

    @BeforeInsert()
    @BeforeUpdate()
    checkLocation() {
        this.location = `${this.location['x']}, ${this.location['y']}`
    }

}
