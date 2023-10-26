import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    BeforeUpdate,
  } from 'typeorm';

  @Entity({
    name: 'images_produc',
  })
  export class entityimagesProduc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_imgProduc: number;
    @Column({ nullable: true })
    name_prod: string;
    @Column({ nullable: true })
    originalName: string;
    @Column({ nullable: true })
    filename: string;
    @Column({ nullable: true })
    rute: string;
    @Column({ nullable: true })
    size: string;
    @Column({ nullable: true })
    key_group: string;

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
  

