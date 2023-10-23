import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
export declare class StoreService {
    private readonly storeRepository;
    private readonly logger;
    constructor(storeRepository: Repository<Store>);
    create(user: User, createStoreDto: CreateStoreDto): Promise<Store>;
    findByCompany(companyId: number, paginationDto: PaginationDto): Promise<Store[]>;
    update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store>;
    remove(id: number): Promise<boolean>;
}
