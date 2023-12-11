import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { Length } from 'class-validator'; // Importar la anotación Length

  @Entity({ name: "order_codes" })
  export class orderCodes extends BaseEntity {  
    @PrimaryGeneratedColumn()
    id_codeorder: number;  
    
    @Column({ nullable: true })
    id_order: number;
  
    @Column({ nullable: true })
    id_user: string;
  
    @Column({ nullable: true })
    id_associated: string;
  
    @Column({ nullable: true })
    code: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdat: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedat: Date;
  }
  