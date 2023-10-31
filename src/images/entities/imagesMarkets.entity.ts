import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  BeforeUpdate,
} from 'typeorm';

@Entity({
  name: 'images_market',
})
export class entityimagesMarket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_imgmarket: number;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  rute: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  id_user: number;

  @Column({ type: 'boolean', default: () => 'true' })
  available: boolean;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  @BeforeUpdate()
  updateTimestamps() {
    this.updated_at = new Date();
  }
}
