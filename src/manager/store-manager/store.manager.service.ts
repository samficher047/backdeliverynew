import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/admin/product/entities/product.entity';
import { CreateProductDto } from 'src/admin/product/dto/create-product.dto';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { UpdateProductDto } from 'src/admin/product/dto/update-product.dto';
import { HoursOperation } from 'src/admin/hours-peration/entities/hours-peration.entity';
import { Store } from 'src/admin/store/entities/store.entity';
import { UpdateHoursOperationDto } from '../../admin/hours-peration/dto/update-hours-peration.dto';

@Injectable()
export class StoreManagerService {

  private readonly logger = new Logger('StoreManagerService');

  constructor(

    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(HoursOperation)
    private readonly hoursOperationRepository: Repository<HoursOperation>,

  ) { }


  async companies(user: User) {
    const stores = await this.storeRepository.find({
      where: { user: { id: user.id }, },
      order: { id: 'DESC' },
      // select: { stores: true },
      relations: { company: { categories: true } },
    });
    return { stores };
  }

  async products(companyId: number) {
    const query = this.productRepository.createQueryBuilder('cp');
    const products = await query.where('cp.companyId = :companyId', { companyId })
      .orderBy({ id: 'DESC' })
      .getMany();
    return { products };
  }


  async createProduct(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return { product };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const { company } = updateProductDto;

    if (company)
      throw new BadRequestException(`property company should not exist`);

    try {
      const product = await this.productRepository.preload({ id, ...updateProductDto });

      if (product) {
        await this.productRepository.save(product);
        return { product };
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }

    throw new NotFoundException(`Product with id: ${id} not found`);
  }

  async hours(storeId: number) {
    const hours = await this.hoursOperationRepository.find({
      where: { store: { id: storeId }, },
      order: { day: 'ASC' }
    });
    return { hours }
  }

  async updateHour(id: number, updateHoursOperationDto: UpdateHoursOperationDto) {
    try {
      const hour = await this.hoursOperationRepository.preload({ id, ...updateHoursOperationDto });
      if (hour) {
        await this.hoursOperationRepository.save(hour);
        return { hour };
      }
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
    throw new NotFoundException(`HoursOperation with id ${id} is not exist`);
  }
}
