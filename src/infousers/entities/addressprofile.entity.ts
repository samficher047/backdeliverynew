import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from "typeorm";

@Entity({ name: "addres_profile" })
export class addres_profileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_address: number;

  @Column({ nullable: true })
  id_user: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  contry_code: number;

  @Column({ nullable: true })
  delegation: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true, default: 0 })
  number: number;

  @Column({ nullable: true, default: 0 })
  interior_num: number;

  @Column({ nullable: true })
  type: number;

  @Column({ nullable: true })
  reference: string;

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
