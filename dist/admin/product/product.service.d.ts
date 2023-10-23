import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
export declare class ProductService {
    private readonly productRepository;
    private readonly logger;
    constructor(productRepository: Repository<Product>);
    create(createProductDto: CreateProductDto, user: User): Promise<Product>;
    findByCompany(companyId: number, paginationDto: PaginationDto): Promise<Product[]>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<boolean>;
}
