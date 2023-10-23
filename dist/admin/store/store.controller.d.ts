import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    create(createStoreDto: CreateStoreDto, user: User): Promise<import("./entities/store.entity").Store>;
    findByCompany(companyId: number, paginationDto: PaginationDto): Promise<import("./entities/store.entity").Store[]>;
    update(id: number, updateStoreDto: UpdateStoreDto): Promise<import("./entities/store.entity").Store>;
    remove(id: number): Promise<boolean>;
}
