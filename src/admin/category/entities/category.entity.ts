
import { IsNumber } from "class-validator";
import { CompanyCategory } from "src/admin/company-category/entities/company-category.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('increment')
    @IsNumber()
    id: number;

    @Column('text', { unique: true })
    name: string;

    @Column('text', { default: 'https://cdn-icons-png.flaticon.com/512/685/685352.png' })
    image: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(
        () => CompanyCategory,
        (companyCategory) => companyCategory.category,
        { cascade: true, eager: false }
    )
    companies?: CompanyCategory[];
}
