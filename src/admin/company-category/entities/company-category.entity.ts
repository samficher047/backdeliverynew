import { Category } from "src/admin/category/entities/category.entity";
import { Company } from "src/admin/company/entities/company.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(["company", "category"])
export class CompanyCategory {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(
        () => Company,
        (company) => company.categories,
        { onDelete: "CASCADE", nullable: false }
    )
    company: Company;

    @ManyToOne(
        () => Category,
        (category) => category.companies,
        { onDelete: "CASCADE", nullable: false, eager: true }
    )
    category: Category;

}