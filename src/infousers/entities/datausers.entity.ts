import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeUpdate,
  } from "typeorm";

  @Entity({ name: "data_users" })
  export class datausersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_infousers: number;

    @Column({ nullable: true })
    id_user: number;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ nullable: true })
    lastname: string;
  
    @Column({ nullable: true })
    email: string;
  
    @Column({ nullable: true })
    phone: number;

    @Column({ nullable: true })
    birthdate: string;

    @Column({ nullable: true })
    gender: string;
  
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
  