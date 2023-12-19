import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeUpdate,
  } from "typeorm";

  @Entity({ name: "billing" })
  export class billingEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_billing: number;

    @Column({ nullable: true })
    id_user: number;

    @Column({ nullable: true })
    rfc: string;
  
    @Column({ nullable: true })
    type_of_person: string;
  
    @Column({ nullable: true })
    legal_name: string;
  
    @Column({ nullable: true })
    payment_method: string;
  
    @Column({ nullable: true })
    tax_regime: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: number;
  
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
  