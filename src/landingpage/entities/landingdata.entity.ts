import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'landingdata' })
export class landingdata extends BaseEntity {
  @PrimaryGeneratedColumn()
  idland: number;

  @Column({ nullable: true })
  nombreempresa: string;

  @Column({ nullable: true })
  nombreresponsable: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  correo: string;

  @Column({ nullable: true, type: 'int' })
  cantidademp: number;

  @Column({ nullable: true })
  tamaño: string;

  @Column({ nullable: true })
  giro: string;

  @Column({ nullable: true, type: 'int' })
  enviosmensual: number;

  @Column({ nullable: true })
  tipoenvios: string;

  @Column({ nullable: true })
  operadorlog: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechacreacion: Date;
}
