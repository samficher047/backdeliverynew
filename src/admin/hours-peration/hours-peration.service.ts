import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { Repository } from 'typeorm';
import { CreateHoursOperationDto } from './dto/create-hours-peration.dto';
import { UpdateHoursOperationDto } from './dto/update-hours-peration.dto';
import { HoursOperation } from './entities/hours-peration.entity';

@Injectable()
export class HoursOperationService {


  private readonly logger = new Logger('CompanyService');

  constructor(

    @InjectRepository(HoursOperation)
    private readonly hoursOperationRepository: Repository<HoursOperation>,
  ) { }

  async create(createHoursOperationDto: CreateHoursOperationDto) {
    try {
      const hoursOperation = this.hoursOperationRepository.create(createHoursOperationDto);
      await this.hoursOperationRepository.save(hoursOperation);
      return hoursOperation;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findByStore(storeId: number) {
    return await this.hoursOperationRepository.find({
      where: { store: { id: storeId }, },
      order: { day: 'ASC' }
    });
  }

  async update(id: number, updateHoursOperationDto: UpdateHoursOperationDto) {
    try {
      const hoursOperation = await this.hoursOperationRepository.preload({ id, ...updateHoursOperationDto });
      if (hoursOperation) {
        await this.hoursOperationRepository.save(hoursOperation);
        return hoursOperation;
      }
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
    throw new NotFoundException(`HoursOperation with id ${id} is not exist`);
  }

}
