import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, ParseArrayPipe, Patch } from '@nestjs/common';
import { ProductMarketDto } from './dto/product-market.dto';
import { StoreMarketDto } from './dto/company-market.dto';
import { MarketService } from './market.service';
import { TypesRol } from 'src/common/glob/types';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { OrderMarketDto } from './dto/order-market.dto';
import { CostDeliveryMarketDto } from './dto/cost-delivery-market.dto';
import { QualifyMarketDto } from './dto/qualify-market.dto';

@Controller('client/market')
export class MarketController {
  constructor(private readonly marketService: MarketService) { }

  @Get('companies')
  // @Auth(TypesRol.client)
  findCompanies(@Query() storeMarketDto: StoreMarketDto) {
    return this.marketService.findCompanies(storeMarketDto);
  }

  @Get('categories')
  // @Auth(TypesRol.client)
  findCategories(@Query() storeMarketDto: StoreMarketDto) {
    return this.marketService.findCategories(storeMarketDto);
  }

  @Get('products/company/:companyId')
  // @Auth(TypesRol.client)
  findProductsByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Query() productMarketDto: ProductMarketDto
  ) {
    return this.marketService.findProductsByCompany(companyId, productMarketDto);
  }

  @Get('delivery-cost/companies/:companyIds')
  @Auth()
  deliveryCost(
    @Param('companyIds', ParseArrayPipe) companyIds: number[],
    @Query() costDeliveryMarketDto: CostDeliveryMarketDto,
    @GetUser() user: User,
  ) {
    return this.marketService.deliveryCost(user, companyIds, costDeliveryMarketDto);
  }

  @Get('orders')
  @Auth(TypesRol.client)
  findOrders(
    @GetUser() user: User,
  ) {
    return this.marketService.findOrders(user);
  }

  @Get('order/:orderId')
  @Auth(TypesRol.client)
  findOrder(
    @GetUser() user: User,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return this.marketService.findOrder(orderId, user);
  }

  @Post('buy')
  @Auth(TypesRol.client)
  buy(
    @Body() orderMarketDto: OrderMarketDto,
    @GetUser() user: User,
  ) {
    return this.marketService.buy(user, orderMarketDto);
  }

  @Patch('qualify/:orderId')
  @Auth(TypesRol.client)
  qualify(
    @Body() qualifyMarketDto: QualifyMarketDto,
    @GetUser() user: User,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return this.marketService.qualify(orderId, user, qualifyMarketDto);
  }
}
