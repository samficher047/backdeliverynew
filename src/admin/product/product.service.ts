import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/auth/entities/user.entity';

import handleDbExceptions from "src/common/exceptions/error.db.exception";

@Injectable()
export class ProductService {


  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return product;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findByCompany(companyId: number, paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    const query = this.productRepository.createQueryBuilder('cp');
    const products = await query.where('cp.companyId = :companyId', { companyId })
      .take(limit)
      .skip(offset)
      .getMany();
    return products;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { company } = updateProductDto;

    if (company)
      throw new BadRequestException(`property company should not exist`);

    try {
      const product = await this.productRepository.preload({ id, ...updateProductDto });

      if (product) {
        await this.productRepository.save(product);
        return product;
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }

    throw new NotFoundException(`Product with id: ${id} not found`);
  }

  async remove(id: number) {
    await this.productRepository.softDelete({ id: id });
    return true;
  }
}
