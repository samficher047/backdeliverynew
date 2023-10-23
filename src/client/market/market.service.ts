import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { ViewProduct } from './views/product.view.entity';
import { ViewCompany } from './views/company.view.entity';
import { User } from 'src/auth/entities/user.entity';
import { StoreMarketDto } from './dto/company-market.dto';
import { Repository } from 'typeorm';
import { OrderMarketDto } from './dto/order-market.dto';
import { Order } from './entities/order.entity';
import { ProductMarketDto } from './dto/product-market.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ViewCategory } from './views/category.view.entity';
import { StatusOrder } from 'src/common/glob/status';
import { Store } from '../../admin/store/entities/store.entity';
import { CostDeliveryMarketDto } from './dto/cost-delivery-market.dto';
import { NotificationService } from '../../notification/notification.service';
import { TypesNotification } from 'src/common/glob/types';
import { FilterKM } from '../../common/glob/filter';
import { QualifyMarketDto } from './dto/qualify-market.dto';
import { TypesPayment } from '../../common/glob/types';
import { Balance } from '../balance/entities/balance.entity';
@Injectable()
export class MarketService {

  private readonly logger = new Logger('MarketService');

  constructor(
    @InjectRepository(ViewCompany)
    private readonly companyViewRepository: Repository<ViewCompany>,

    @InjectRepository(ViewCategory)
    private readonly categoryViewRepository: Repository<ViewCategory>,

    @InjectRepository(ViewProduct)
    private readonly productViewRepository: Repository<ViewProduct>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,

    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,

    @Inject(NotificationService)
    private readonly notificationService: NotificationService
  ) { }

  private sqlFilterStore = (latitude: number, longitude: number):
    string =>
    `ST_DistanceSphere( 
      ST_GeomFromText('POINT(${latitude} ${longitude})'), 
        st.location::geometry) 
      <= :km`;

  async findCompanies(storeMarketDto: StoreMarketDto) {
    const { limit = 100, offset = 0, latitude, longitude, categoryId } = storeMarketDto;
    try {
      const query = this.companyViewRepository.createQueryBuilder('st');
      let companies = [];
      if (categoryId > 0) {
        companies = await query
          .where(this.sqlFilterStore(latitude, longitude), { km: FilterKM.STORES_NEARBY })
          .andWhere("st.categoryId = :categoryId", { categoryId })
          .distinctOn(['id'])
          .take(limit)
          .skip(offset)
          .getMany();
      } else {
        companies = await query
          .where(this.sqlFilterStore(latitude, longitude), { km: FilterKM.STORES_NEARBY })
          .distinctOn(['id'])
          .take(limit)
          .skip(offset)
          .getMany();
      }

      companies.sort(function (a, b) { return b.isOpen - a.isOpen; });

      // Example of companies [c1, c2, c3, c4, c5, c6, c7] jump 3
      // companiesId = [3, 6]
      const jump = Math.round(new Date().getHours() / 4);
      let companiesId: [] = [];
      if (companies.length >= jump * 3) {
        companiesId = companies.reduce((ids, element, index) => {
          if (element.isOpen && (index + 1) % jump == 0) ids.push(element.id)
          return ids;
        }, []);
      }
      if (companiesId.length <= 0) {
        companiesId = companies.reduce((ids, element) => {
          if (element.isOpen)
            ids.push(element.id)
          return ids;
        }, []);
      }

      // We return the products sorted in ascending order if the jump is pair 
      // otherwise we sort in descending order.
      let products = [];
      if (companiesId.length > 0) products = await this.productViewRepository.createQueryBuilder('p')
        .where(`p.companyId IN (:...companiesId)`, { companiesId })
        .orderBy({ 'p.companyId': jump % 2 == 0 ? 'ASC' : 'DESC' })
        .getMany();

      // We return only one product by company
      let companyId = 0;
      products = products.reduce((products, element) => {
        if (element.companyId != companyId) {
          products.push(element);
          companyId = element.companyId;
        }
        return products;
      }, []);


      return { companies, products };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findCategories(storeMarketDto: StoreMarketDto) {
    const { limit = 100, offset = 0, latitude, longitude } = storeMarketDto;
    try {
      const query = this.categoryViewRepository.createQueryBuilder('st');
      const categories = await query
        .where(this.sqlFilterStore(latitude, longitude), { km: FilterKM.STORES_NEARBY })
        .take(limit)
        .skip(offset)
        .getMany();
      return { categories };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findOrders(user: User) {
    try {
      const orders = await this.orderRepository.createQueryBuilder('p')
        .select(['p', 'user.id', 'user.fullName', 'user.image', 'company.image', 'company.marker', 'store.id', 'store.name', 'store.address', 'store.location'])
        .innerJoin("p.store", "store")
        .innerJoin("store.company", "company")
        .leftJoin("p.deliveryman", "user")
        .where('p.userId = :userId AND (p.status <= :statusDelivered OR p.status = :statusCancelled)',
          { userId: user.id, statusDelivered: StatusOrder.DELIVERED, statusCancelled: StatusOrder.CANCELLED })
        .orderBy({ 'p.id': 'DESC' }).getMany()
      return { orders };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findOrder(orderId: number, user: User) {
    try {
      const order = await this.orderRepository.createQueryBuilder('p')
        .select(['p', 'user.id', 'user.fullName', 'user.image', 'company.image', 'company.marker', 'store.id', 'store.name', 'store.address', 'store.location'])
        .innerJoin("p.store", "store")
        .innerJoin("store.company", "company")
        .leftJoin("p.deliveryman", "user")
        .where('p.id = :orderId AND p.userId = :userId', { orderId, userId: user.id })
        .getOne()
      return { order };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findProductsByCompany(companyId: number, productMarketDto: ProductMarketDto) {
    const { limit = 100, offset = 0 } = productMarketDto;
    try {
      const products = await this.productViewRepository.createQueryBuilder('p')
        .where(`p.companyId = :companyId`, { companyId })
        .take(limit)
        .skip(offset)
        .getMany();
      return { products };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async deliveryCost(user: User, companyIds: number[], costDeliveryMarketDto: CostDeliveryMarketDto) {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const { latitude, longitude } = costDeliveryMarketDto;
    try {
      const query = this.companyViewRepository.createQueryBuilder('st');
      //Obtenemos las tiendas (stores), que esten abiertos y el mas cercano para obtener el precio de este al momento de comrpa.
      const companies = await query
        .select(['st.storeId'])
        .where(this.sqlFilterStore(latitude, longitude), { km: FilterKM.STORES_NEARBY })
        .andWhere("st.id IN (:...companyIds) AND st.isOpen = true", { companyIds })
        .getMany();
      const storeIds = companies.map((element) => (element['storeId']));

      if (storeIds.length > 0) {
        //Cuando tenemos las tiendas (stores) mas cercanos le consultamos el costo de envio esto en el carrito de compras.
        const sqlCost = `s.name, s.companyId, c.image, c.marker, s.id AS store_id, s.startupCost + ((ST_DistanceSphere(ST_GeomFromText('POINT(${latitude} ${longitude})'), s.location::geometry) / 1000) * s.costKm) AS deliveryFee`;
        let fees = await this.storeRepository.createQueryBuilder('s')
          .select(sqlCost)
          .innerJoin("s.company", "c")
          .where("s.id IN (:...storeIds)", { storeIds })
          .getRawMany()
        return { fees };
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
    throw new BadRequestException(`companyIds`);
  }

  async buy(user: User, orderMarketDto: OrderMarketDto) {
    const { payment, total } = orderMarketDto;

    if (payment == TypesPayment.money) {
      const balance = await this.balanceRepository.findOneBy({ userId: user.id });

      if (!balance)
        throw new BadRequestException(`The client does not have a balance sheet record`);

      if (total > balance.money)
        throw new BadRequestException(`The client has no balance to take the order`);

      //We subtract the total value of the order from the client's money
      balance.money = balance.money - total;
      await this.balanceRepository.save(balance);
    }

    try {
      const order = this.orderRepository.create({ ...orderMarketDto });
      order.user = user;
      await this.orderRepository.save(order);

      const data = {
        "type": TypesNotification.NEW_ORDER,
        "title": 'New order',
        "body": user.fullName,
        "orderId": `${order.id}`
      };

      this.notificationService.notifyOrder(order.id, orderMarketDto.location.x, orderMarketDto.location.y, data);

      delete order.user;
      delete order.location;

      return order;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async qualify(orderId: number, user: User, qualifyMarketDto: QualifyMarketDto) {
    const { scoreClient } = qualifyMarketDto;
    await this.orderRepository.createQueryBuilder()
      .update({ status: StatusOrder.QUALIFIED, scoreClient })
      .where({ id: orderId, user }).execute();
    return true;
  }
}
