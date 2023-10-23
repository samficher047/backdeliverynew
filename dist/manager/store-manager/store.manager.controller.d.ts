import { StoreManagerService } from './store.manager.service';
import { User } from 'src/auth/entities/user.entity';
import { CreateProductDto } from '../../admin/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/admin/product/dto/update-product.dto';
import { UpdateHoursOperationDto } from 'src/admin/hours-peration/dto/update-hours-peration.dto';
export declare class StoreManagerController {
    private readonly managerService;
    constructor(managerService: StoreManagerService);
    companies(user: User): Promise<{
        stores: import("../../admin/store/entities/store.entity").Store[];
    }>;
    products(companyId: number): Promise<{
        products: import("../../admin/product/entities/product.entity").Product[];
    }>;
    create(createProductDto: CreateProductDto): Promise<{
        product: import("../../admin/product/entities/product.entity").Product;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        product: import("../../admin/product/entities/product.entity").Product;
    }>;
    hours(id: number): Promise<{
        hours: import("../../admin/hours-peration/entities/hours-peration.entity").HoursOperation[];
    }>;
    updateHour(id: number, updateHoursOperationDto: UpdateHoursOperationDto): Promise<{
        hour: import("../../admin/hours-peration/entities/hours-peration.entity").HoursOperation;
    }>;
}
