import { Repository } from 'typeorm';
import { CreateHoursOperationDto } from './dto/create-hours-peration.dto';
import { UpdateHoursOperationDto } from './dto/update-hours-peration.dto';
import { HoursOperation } from './entities/hours-peration.entity';
export declare class HoursOperationService {
    private readonly hoursOperationRepository;
    private readonly logger;
    constructor(hoursOperationRepository: Repository<HoursOperation>);
    create(createHoursOperationDto: CreateHoursOperationDto): Promise<HoursOperation>;
    findByStore(storeId: number): Promise<HoursOperation[]>;
    update(id: number, updateHoursOperationDto: UpdateHoursOperationDto): Promise<HoursOperation>;
}
