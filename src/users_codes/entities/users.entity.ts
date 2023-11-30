import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length } from 'class-validator'; // Importar la anotación Length

@Entity({ name: "user" })
export class userexist extends BaseEntity {  
  @PrimaryGeneratedColumn()
  id: number;  
  @Column({ nullable: true })
  idGoogle: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  passwordTemporary: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  isActive: boolean;

  @Column({ nullable: true })
  roles: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
