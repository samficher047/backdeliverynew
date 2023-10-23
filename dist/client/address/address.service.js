"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const error_db_exception_1 = require("../../common/exceptions/error.db.exception");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const address_entity_1 = require("./entities/address.entity");
const axios_1 = require("axios");
const autocomplete_interface_1 = require("./interfaces/autocomplete.interface");
const location_interface_1 = require("../../common/interfaces/location.interface");
let AddressService = class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
        this.logger = new common_1.Logger('AddressService');
        this.apiKeyGoogle = process.env.API_KEY_GOOGLE;
    }
    async create(user, createAddressDto) {
        try {
            const address = this.addressRepository.create({
                ...createAddressDto
            });
            const auxLocation = address.location;
            address.user = user;
            await this.addressRepository.save(address);
            delete address.user;
            address.location = auxLocation;
            return { address };
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
    }
    async findAll(user) {
        const { id } = user;
        const query = this.addressRepository.createQueryBuilder('add');
        const addresses = await query.where('add.userId = :userId', {
            userId: id
        })
            .getMany();
        return { addresses };
    }
    async update(id, updateAddressDto) {
        try {
            const address = await this.addressRepository.preload({ id, ...updateAddressDto, deletedAt: null });
            if (address) {
                const auxLocation = address.location;
                await this.addressRepository.save(address);
                delete address.user;
                address.location = auxLocation;
                return { address };
            }
        }
        catch (error) {
            (0, error_db_exception_1.default)(error, this.logger);
        }
        throw new common_1.NotFoundException(`Address with id: ${id} not found`);
    }
    async remove(id) {
        await this.addressRepository.softDelete({ id: id });
        return true;
    }
    async autocomplete(place, autocompleteAddressDto) {
        const { latitude, longitude } = autocompleteAddressDto;
        const config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
                + `input=${this.clean(place)}`
                + `&location=${latitude},${longitude}`
                + '&radius=90000&strictbounds'
                + `&key=${this.apiKeyGoogle}`
        };
        const { data } = await (0, axios_1.default)(config);
        if (data.error_message) {
            this.logger.error(data.error_message);
            throw new common_1.NotFoundException(data.error_message);
        }
        const response = data;
        const predictions = response.predictions.map(function (element) {
            return new autocomplete_interface_1.Prediction(element.description, element.place_id);
        });
        return { predictions };
    }
    async geocode(placeId) {
        const config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?'
                + `place_id=${placeId}`
                + `&key=${this.apiKeyGoogle}`
        };
        const { data } = await (0, axios_1.default)(config);
        if (data.error_message) {
            this.logger.error(data.error_message);
            throw new common_1.NotFoundException(data.error_message);
        }
        const response = data;
        const locations = response.results.map(function (element) {
            return new location_interface_1.Location(element.geometry.location.lat, element.geometry.location.lng);
        });
        return { locations };
    }
    clean(s) {
        let r = s.toLowerCase();
        r = r.replace(new RegExp(/\s/g), " ");
        r = r.replace(new RegExp(/[àáâãäå]/g), "a");
        r = r.replace(new RegExp(/[èéêë]/g), "e");
        r = r.replace(new RegExp(/[ìíîï]/g), "i");
        r = r.replace(new RegExp(/ñ/g), "n");
        r = r.replace(new RegExp(/[òóôõö]/g), "o");
        r = r.replace(new RegExp(/[ùúûü]/g), "u");
        return r;
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AddressService);
//# sourceMappingURL=address.service.js.map