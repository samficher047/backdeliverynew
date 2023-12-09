import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { landingdata } from './entities/landingdata.entity';
import { landingdataInt } from './landingdata.types';

@Injectable()
export class LandingDataService {
  constructor(
    @InjectRepository(landingdata)
    private readonly landingdata: Repository<landingdata>,
  ) {}

  async savedata(data: landingdataInt): Promise<landingdata> {
    // Crea una nueva instancia de la entidad usando los datos proporcionados
    const newRecord = this.landingdata.create(data);

    // Guarda la nueva instancia en la base de datos
    await newRecord.save();

    // Devuelve el registro guardado
    return newRecord;
  }
}
