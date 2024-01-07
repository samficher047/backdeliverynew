import { BaseEntity } from 'typeorm';
export declare class Wallet extends BaseEntity {
    id: number;
    id_usuario: number;
    monto: number;
    flagentrada: boolean;
    flagsalida: boolean;
    fecha: Date;
    hora: string;
    status: boolean;
}
