import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

import handleDbExceptions from "src/common/exceptions/error.db.exception";

@Injectable()
export class StoreService {

  private readonly logger = new Logger('StoreService');

  constructor(

    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,

  ) { }

  async create(user: User, createStoreDto: CreateStoreDto) {
    try {

      const store = this.storeRepository.create({ ...createStoreDto });
      store.user = user;
      await this.storeRepository.save(store);

      delete store.location;
      return store;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findByCompany(companyId: number, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const query = this.storeRepository.createQueryBuilder('st');
    const stores = await query.where('st.companyId = :companyId', { companyId })
      .take(limit)
      .skip(offset)
      .getMany();

    return stores;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const { company } = updateStoreDto;

    if (company)
      throw new BadRequestException(`property company should not exist`);

    try {
      const store = await this.storeRepository.preload({
        id,
        ...updateStoreDto
      });

      if (store) {
        await this.storeRepository.save(store);
        return store;
      }

    } catch (error) {
      console.log(error);
      handleDbExceptions(error, this.logger);
    }
    throw new NotFoundException(`Store with id: ${id} not found`);
  }

  async remove(id: number) {
    await this.storeRepository.softDelete({ id: id });
    return true;
  }

}
