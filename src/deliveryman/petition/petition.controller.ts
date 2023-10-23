import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { TypesRol } from 'src/common/glob/types';

import { PetitionService } from './petition.service';
import { CollectPetitonDto } from './dto/collect-petition.dto';
import { ActivatePetitionDto } from './dto/activate-petition.dto';
import { FindPetitionsDto } from './dto/find-petitions.dto';

@Controller('deliveryman/petition')
export class PetitionController {
  constructor(private readonly petitionService: PetitionService) { }

  @Get('near')
  @Auth(TypesRol.deliveryman)
  findNearPetitions(
    @Query() findPetitionsDto: FindPetitionsDto,
    @GetUser() user: User,
  ) {
    return this.petitionService.findNearPetitions(user, findPetitionsDto);
  }

  @Get('id/:orderId')
  @Auth(TypesRol.deliveryman)
  findPetition(
    @Param('orderId', ParseIntPipe) orderId: number,
    @GetUser() user: User,
  ) {
    return this.petitionService.findPetition(user, orderId);
  }

  @Get('ordered-at/:orderedAt')
  @Auth(TypesRol.deliveryman)
  history(
    @Param('orderedAt') orderedAt: string,
    @GetUser() user: User,
  ) {
    return this.petitionService.history(user, orderedAt);
  }

  @Patch('apply/:orderId')
  @Auth(TypesRol.deliveryman)
  apply(
    @Param('orderId', ParseIntPipe) orderId: number,
    @GetUser() user: User,
  ) {
    return this.petitionService.apply(orderId, user);
  }

  @Patch('collect/:orderId')
  @Auth(TypesRol.deliveryman)
  collect(
    @Param('orderId', ParseIntPipe) orderId: number,
    @GetUser() user: User,
  ) {
    return this.petitionService.collect(orderId, user);
  }

  @Patch('deliver/:orderId')
  @Auth(TypesRol.deliveryman)
  deliver(
    @Param('orderId', ParseIntPipe) orderId: number,
    @GetUser() user: User,
    @Body() collectPetitonDto: CollectPetitonDto,
  ) {
    return this.petitionService.deliver(orderId, user, collectPetitonDto);
  }

  @Patch('cancel/:orderId')
  @Auth(TypesRol.deliveryman)
  cancel(
    @Param('orderId', ParseIntPipe) orderId: number,
    @GetUser() user: User,
  ) {
    return this.petitionService.cancel(orderId, user);
  }

  @Patch('activate')
  @Auth(TypesRol.deliveryman)
  activate(
    @GetUser() user: User,
    @Body() activatePetitionDto: ActivatePetitionDto,
  ) {
    return this.petitionService.activate(activatePetitionDto, user);
  }

}
