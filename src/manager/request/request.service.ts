import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { StatusOrder } from 'src/common/glob/status';
import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/client/market/entities/order.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RequestService {

  private readonly logger = new Logger('RequestService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  async findNearRequests(user: User) {
    try {

      const requests = await this._queryRequest()
        .where('store.userId = :userId AND p.status < :statusDelivered', {
          userId: user.id, statusDelivered: StatusOrder.DELIVERED,
        }).orderBy({ 'p.id': 'ASC' }).getMany()

      return { requests };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findRequest(user: User, orderId: number) {
    try {
      const request = await this._queryRequest()
        .where('p.id = :orderId', { orderId })
        .getOne();
      return { request };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async history(user: User, orderedAt: string) {
    try {
      const requests = await this._queryRequest()
        .where('store.userId = :userId AND p.orderedAt = :orderedAt', {
          userId: user.id, orderedAt: orderedAt
        }).orderBy({ 'p.id': 'DESC' })
        .getMany()
      return { requests };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  _queryRequest() {
    return this.orderRepository.createQueryBuilder('p')
      .select(['p', 'user.id', 'user.fullName', 'user.phone', 'user.image', 'store.id', 'store.name', 'store.address', 'store.contact', 'store.location', 'company.image'])
      .innerJoin("p.user", "user")
      .innerJoin("p.store", "store")
      .innerJoin("store.company", "company")
  }

}
