import { User } from 'src/auth/entities/user.entity';
import { PetitionService } from './petition.service';
import { CollectPetitonDto } from './dto/collect-petition.dto';
import { ActivatePetitionDto } from './dto/activate-petition.dto';
import { FindPetitionsDto } from './dto/find-petitions.dto';
export declare class PetitionController {
    private readonly petitionService;
    constructor(petitionService: PetitionService);
    findNearPetitions(findPetitionsDto: FindPetitionsDto, user: User): Promise<{
        petitions: import("../../client/market/entities/order.entity").Order[];
    }>;
    findPetition(orderId: number, user: User): Promise<{
        petition: import("../../client/market/entities/order.entity").Order;
    }>;
    history(orderedAt: string, user: User): Promise<{
        petitions: import("../../client/market/entities/order.entity").Order[];
    }>;
    apply(orderId: number, user: User): Promise<{
        petition: import("../../client/market/entities/order.entity").Order;
    }>;
    collect(orderId: number, user: User): Promise<{
        petition: import("../../client/market/entities/order.entity").Order;
    }>;
    deliver(orderId: number, user: User, collectPetitonDto: CollectPetitonDto): Promise<{
        petition: import("../../client/market/entities/order.entity").Order;
    }>;
    cancel(orderId: number, user: User): Promise<{
        petition: import("../../client/market/entities/order.entity").Order;
    }>;
    activate(user: User, activatePetitionDto: ActivatePetitionDto): Promise<boolean>;
}
