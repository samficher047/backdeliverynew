import { HoursOperationService } from './hours-peration.service';
import { CreateHoursOperationDto } from './dto/create-hours-peration.dto';
import { UpdateHoursOperationDto } from './dto/update-hours-peration.dto';
export declare class HoursOperationController {
    private readonly hoursOperationService;
    constructor(hoursOperationService: HoursOperationService);
    create(createHoursOperationDto: CreateHoursOperationDto): Promise<import("./entities/hours-peration.entity").HoursOperation>;
    findByStore(id: number): Promise<import("./entities/hours-peration.entity").HoursOperation[]>;
    update(id: number, updateHoursOperationDto: UpdateHoursOperationDto): Promise<import("./entities/hours-peration.entity").HoursOperation>;
}
