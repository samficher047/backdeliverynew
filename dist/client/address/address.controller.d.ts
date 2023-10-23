import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from 'src/auth/entities/user.entity';
import { AutocompleteAddressDto } from './dto/autocomplete-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(user: User, createAddressDto: CreateAddressDto): Promise<{
        address: import("./entities/address.entity").Address;
    }>;
    findAll(user: User): Promise<{
        addresses: import("./entities/address.entity").Address[];
    }>;
    update(user: User, id: number, updateAddressDto: UpdateAddressDto): Promise<{
        address: import("./entities/address.entity").Address;
    }>;
    remove(user: User, id: number): Promise<boolean>;
    autocomplete(autocompleteAddressDto: AutocompleteAddressDto, place: string): Promise<{
        predictions: import("./interfaces/autocomplete.interface").Prediction[];
    }>;
    geocode(placeId: string): Promise<{
        locations: import("../../common/interfaces/location.interface").Location[];
    }>;
}
