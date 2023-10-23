import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from 'src/auth/entities/user.entity';
import { AutocompleteAddressDto } from './dto/autocomplete-address.dto';

@Controller('client/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @Auth()
  create(
    @GetUser() user: User,
    @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(user, createAddressDto);
  }

  @Get()
  @Auth()
  findAll(
    @GetUser() user: User,
  ) {
    return this.addressService.findAll(user);
  }

  @Patch(':id')
  @Auth()
  update(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @Auth()
  remove(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number) {
    return this.addressService.remove(id);
  }

  @Get('autocomplete/:place')
  autocomplete(
    @Query() autocompleteAddressDto: AutocompleteAddressDto,
    @Param('place') place: string,
  ) {
    return this.addressService.autocomplete(place, autocompleteAddressDto);
  }

  @Get('geocode/:placeId')
  geocode(
    @Param('placeId') placeId: string,
  ) {
    return this.addressService.geocode(placeId);
  }
}
