import { User } from "src/auth/entities/user.entity";
import { Company } from "src/admin/company/entities/company.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNumber, IsPositive, IsString, Min } from "class-validator";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('increment')
    @IsPositive()
    id: number;

    @Column('text', {
        unique: true,
    })
    @IsString()
    name: string;

    @Column('text')
    @IsString()
    description: string

    @Column('text')
    @IsString()
    image: string

    @IsString()
    // It is the note that the client adds when he decides to buy.
    note: string

    @IsNumber()
    @Min(0.01)
    total: number;

    @IsPositive()
    @Min(1)
    number: number;

    @Column('int', {
        default: 1
    })
    type: number;

    @Column('float', {
        default: 0
    })
    @IsNumber()
    price: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt?: Date;

    @ManyToOne(
        () => Company,
        (company) => company.products,
        { onDelete: 'CASCADE' }
    )
    company: Company
}