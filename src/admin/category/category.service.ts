import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CategoryService {

  private readonly logger = new Logger('CompanyService');

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.categoryRepository.find({ take: limit, skip: offset });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.preload({ id, ...updateCategoryDto });

      if (category) {
        await this.categoryRepository.save(category);
        return category;
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
    throw new NotFoundException(`Category with id ${id} is not exist`);
  }

}
