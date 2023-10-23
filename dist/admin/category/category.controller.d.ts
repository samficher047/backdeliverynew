import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./entities/category.entity").Category>;
    findAll(paginationDto: PaginationDto): Promise<import("./entities/category.entity").Category[]>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
}
