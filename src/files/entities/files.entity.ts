import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from "typeorm";
import { Length } from "class-validator"; // Importar la anotación Length

@Entity({ name: "files" })
export class typefiles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_files: number;

  @Column({ nullable: true })
  id_user: number;

  @Column({ nullable: true })
  origin_name_file: string;

  @Column({ nullable: true })
  new_name_file: string;

  @Column({ nullable: true })
  rute: string;

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
