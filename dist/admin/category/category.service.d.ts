import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    private readonly logger;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(paginationDto: PaginationDto): Promise<Category[]>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
}
