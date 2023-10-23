import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/admin/product/entities/product.entity';
import { CreateProductDto } from 'src/admin/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/admin/product/dto/update-product.dto';
import { HoursOperation } from 'src/admin/hours-peration/entities/hours-peration.entity';
import { Store } from 'src/admin/store/entities/store.entity';
import { UpdateHoursOperationDto } from '../../admin/hours-peration/dto/update-hours-peration.dto';
export declare class StoreManagerService {
    private readonly storeRepository;
    private readonly productRepository;
    private readonly hoursOperationRepository;
    private readonly logger;
    constructor(storeRepository: Repository<Store>, productRepository: Repository<Product>, hoursOperationRepository: Repository<HoursOperation>);
    companies(user: User): Promise<{
        stores: Store[];
    }>;
    products(companyId: number): Promise<{
        products: Product[];
    }>;
    createProduct(createProductDto: CreateProductDto): Promise<{
        product: Product;
    }>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<{
        product: Product;
    }>;
    hours(storeId: number): Promise<{
        hours: HoursOperation[];
    }>;
    updateHour(id: number, updateHoursOperationDto: UpdateHoursOperationDto): Promise<{
        hour: HoursOperation;
    }>;
}
