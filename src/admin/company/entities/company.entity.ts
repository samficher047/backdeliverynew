import { Product } from "src/admin/product/entities/product.entity";
import { Store } from "src/admin/store/entities/store.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompanyCategory } from "src/admin/company-category/entities/company-category.entity";
import { IsNumber } from "class-validator";
import { Location } from "src/common/interfaces/location.interface";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Company {

    @PrimaryGeneratedColumn('increment')
    @IsNumber()
    id: number;

    @Column('text', { unique: true })
    name: string;

    @Column('text')
    address: string;

    @Column('text')
    contact: string;

    @Column('text', { default: '' })
    image: string;

    @Column('text', { default: '' })
    marker: string;

    @Column('text')
    email: string;

    @Column("point")
    @Index({ spatial: true })
    location: Location | string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    checkLocation() {
        this.location = `${this.location['x']}, ${this.location['y']}`
    }

    @ManyToOne(
        () => User,
        (user) => user.companies,
        { onDelete: "SET NULL" }
    )
    user: User;

    @OneToMany(
        () => Product,
        (products) => products.company,
        { cascade: true, eager: false }
    )
    products?: Product[];

    @OneToMany(
        () => Store,
        (stores) => stores.company,
        { cascade: true, eager: false }
    )
    stores?: Store[];

    @OneToMany(
        () => CompanyCategory,
        (companyCategory) => companyCategory.company,
        { cascade: true, eager: false }
    )
    categories?: CompanyCategory[];
}
