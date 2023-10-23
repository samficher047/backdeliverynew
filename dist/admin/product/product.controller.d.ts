import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, user: User): Promise<import("./entities/product.entity").Product>;
    findByCompany(companyId: number, paginationDto: PaginationDto): Promise<import("./entities/product.entity").Product[]>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: number): Promise<boolean>;
}
