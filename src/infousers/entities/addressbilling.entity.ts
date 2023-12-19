import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeUpdate,
  } from "typeorm";

  @Entity({ name: "addreess_billing" })
  export class addressbillingEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_addres_fiscal: number;

    @Column({ nullable: true })
    id_user: number;
    
    @Column({ nullable: true })
    street: string;

    @Column({ nullable: true })
    neighborhood: string;
  
    @Column({ nullable: true })
    number: number;
  
    @Column({ nullable: true })
    num_inter: number;
  
    @Column({ nullable: true })
    contry_code: number;
  
    @Column({ nullable: true })
    city: string;

    @Column({ type: "boolean", default: () => "true" })
    available: boolean;
  
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
  
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
    
    @BeforeUpdate()
    updateTimestamps() {
      this.updated_at = new Date();
    }
  }
  