import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  BeforeUpdate,
} from 'typeorm';

@Entity({
  name: 'images',
})
export class entityimages1 extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_img: number;
  @Column({ nullable: true })
  rute: string;
  @Column({ nullable: true })
  id_user: number;
  @Column({ nullable: true })
  type_user: number;
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

// status
//  0 default
//  1 incluido en paquete definido por proveedor
//  2 opcional para que cliente lo agrege
//  3 no mostrar
