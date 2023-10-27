import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    BeforeUpdate,
  } from 'typeorm';

  @Entity({
    name: 'images_dealers',
  })
  export class entityimagesDealers extends BaseEntity {
    @PrimaryGeneratedColumn()
  id_imgDealers
  @Column({ nullable: true })
  id_deliv: number;
  @Column({ nullable: true })
  code_deliv: string;
  @Column({ nullable: true })
  name_deliv: string;
  @Column({ nullable: true })
  namefile: string;
  @Column({ nullable: true })
  name_original: string;
  @Column({ nullable: true })
  rute: string;
  @Column({ nullable: true })
  size: number;
  @Column({ nullable: true })
  id_company: number;
  @Column({ nullable: true })
  type_com: string;

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
  
  
  // id_imgDealers, id_deliv, code_deliv, name_deliv, namefile, name_original, rute, size, id_company, type_com