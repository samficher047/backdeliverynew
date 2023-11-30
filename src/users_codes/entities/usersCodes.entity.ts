import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    BeforeUpdate,
  } from 'typeorm';
  import { Length } from 'class-validator'; // Importar la anotación Length

  @Entity({
    name: 'users_code',
  })
  export class users_code extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_userscode: number;
  
    @Column({ nullable: true })
    id_user: number;
  
    @Column()
    @Length(8, 8, { message: 'Code length must be 8 characters' })
    code: string;
  
    @Column({ nullable: true })
    id_company: string;
  
    @Column({ type: 'boolean', default: true })
    available: boolean;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  }
  