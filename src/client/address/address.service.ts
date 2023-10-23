import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import axios from 'axios';
import { Autocomplete, Prediction } from './interfaces/autocomplete.interface';
import { Geocode } from './interfaces/geocode.interface';
import { Location } from 'src/common/interfaces/location.interface';
import { AutocompleteAddressDto } from './dto/autocomplete-address.dto';

@Injectable()
export class AddressService {

  private readonly logger = new Logger('AddressService');
  private readonly apiKeyGoogle: string;

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

  ) {
    this.apiKeyGoogle = process.env.API_KEY_GOOGLE;
  }


  async create(user: User, createAddressDto: CreateAddressDto) {
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

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findAll(user: User) {
    const { id } = user;
    const query = this.addressRepository.createQueryBuilder('add');
    const addresses = await query.where('add.userId = :userId',
      {
        userId: id
      })
      .getMany();
    return { addresses };
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      const address = await this.addressRepository.preload({ id, ...updateAddressDto, deletedAt: null });

      if (address) {

        const auxLocation = address.location;

        await this.addressRepository.save(address);

        delete address.user;

        address.location = auxLocation;
        return { address };

      }
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
    throw new NotFoundException(`Address with id: ${id} not found`);
  }

  async remove(id: number) {
    await this.addressRepository.softDelete({ id: id });
    return true;
  }

  async autocomplete(place: string, autocompleteAddressDto: AutocompleteAddressDto) {
    const { latitude, longitude } = autocompleteAddressDto;

    const config = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
        + `input=${this.clean(place)}`
        + `&location=${latitude},${longitude}`
        + '&radius=90000&strictbounds' // radius 90 KM
        + `&key=${this.apiKeyGoogle}`
    };

    const { data } = await axios(config);

    if (data.error_message) {
      this.logger.error(data.error_message);
      throw new NotFoundException(data.error_message);
    }

    const response: Autocomplete = data;

    const predictions = response.predictions.map(function (element) {
      return new Prediction(element.description, element.place_id);
    });

    return { predictions };
  }

  async geocode(placeId: string) {
    const config = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?'
        + `place_id=${placeId}`
        + `&key=${this.apiKeyGoogle}`
    };
    const { data } = await axios(config);

    if (data.error_message) {
      this.logger.error(data.error_message);
      throw new NotFoundException(data.error_message);
    }

    const response: Geocode = data;

    const locations = response.results.map(function (element) {
      return new Location(element.geometry.location.lat, element.geometry.location.lng);
    });

    return { locations };
  }

  clean(s: string): string {
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
}
