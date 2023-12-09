import { BaseEntity } from 'typeorm';
export declare class landingdata extends BaseEntity {
    idland: number;
    nombreempresa: string;
    nombreresponsable: string;
    telefono: string;
    correo: string;
    cantidademp: number;
    tamaño: string;
    giro: string;
    enviosmensual: number;
    tipoenvios: string;
    operadorlog: string;
    fechacreacion: Date;
}
