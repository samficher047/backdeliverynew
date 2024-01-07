import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'wallet' })
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_usuario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  flagentrada: boolean;

  @Column()
  flagsalida: boolean;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @Column({ type: 'time', default: () => 'CURRENT_TIME' })
  hora: string;

  @Column({ default: true })
  status: boolean;
}
