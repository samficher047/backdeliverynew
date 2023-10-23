import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Prediction } from './interfaces/autocomplete.interface';
import { Location } from 'src/common/interfaces/location.interface';
import { AutocompleteAddressDto } from './dto/autocomplete-address.dto';
export declare class AddressService {
    private readonly addressRepository;
    private readonly logger;
    private readonly apiKeyGoogle;
    constructor(addressRepository: Repository<Address>);
    create(user: User, createAddressDto: CreateAddressDto): Promise<{
        address: Address;
    }>;
    findAll(user: User): Promise<{
        addresses: Address[];
    }>;
    update(id: number, updateAddressDto: UpdateAddressDto): Promise<{
        address: Address;
    }>;
    remove(id: number): Promise<boolean>;
    autocomplete(place: string, autocompleteAddressDto: AutocompleteAddressDto): Promise<{
        predictions: Prediction[];
    }>;
    geocode(placeId: string): Promise<{
        locations: Location[];
    }>;
    clean(s: string): string;
}
