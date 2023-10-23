import { Inject, Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { StatusOrder } from 'src/common/glob/status';
import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/client/market/entities/order.entity';
import { CollectPetitonDto } from './dto/collect-petition.dto';
import { Session } from '../../auth/entities/session.entity';
import { ActivatePetitionDto } from './dto/activate-petition.dto';
import { FilterKM } from 'src/common/glob/filter';
import { NotificationService } from '../../notification/notification.service';
import { TypesNotification, TypesPayment } from '../../common/glob/types';
import { FindPetitionsDto } from './dto/find-petitions.dto';
import { Balance } from '../../client/balance/entities/balance.entity';
import { ErrorCode } from '../../common/glob/error';

@Injectable()
export class PetitionService {

  private readonly logger = new Logger('PetitionService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,

    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,

    @Inject(NotificationService)
    private readonly notificationService: NotificationService,

  ) { }

  private _sqlFilterOrder = (latitude: number, longitude: number):
    string =>
    `
    (
      p.deliverymanId = :deliverymanId AND p.status < :statusDelivered
    )
    OR
    (
      p.status = :statusStarted AND ST_DistanceSphere(ST_GeomFromText('POINT(${latitude} ${longitude})'),p.location::geometry) <= :km
    )`;

  async findNearPetitions(user: User, findPetitionsDto: FindPetitionsDto) {
    const { idDevice } = findPetitionsDto;
    try {
      const session = await this.sessionRepository.createQueryBuilder('s')
        .select(['s.location'])
        .where('s.userId = :userId', { userId: user.id, idDevice }).getOne()

      if (!session) return;

      const petitions = await this._queryPetition()
        .where(this._sqlFilterOrder(session.location['x'], session.location['y']), {
          deliverymanId: user.id, statusDelivered: StatusOrder.DELIVERED, statusStarted: StatusOrder.STARTED, km: FilterKM.DELIVERYMAN
        }).orderBy({ 'p.id': 'ASC' }).getMany()

      return { petitions };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async findPetition(user: User, orderId: number) {
    try {
      const petition = await this._queryPetition()
        .where('p.id = :orderId', { orderId })
        .getOne();

      return { petition };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async history(user: User, orderedAt: string) {
    try {
      const petitions = await this._queryPetition()
        .where('p.deliverymanId = :deliverymanId AND p.orderedAt = :orderedAt', {
          deliverymanId: user.id, orderedAt: orderedAt
        }).orderBy({ 'p.id': 'DESC' })
        .getMany()
      return { petitions };
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  _queryPetition() {
    return this.orderRepository.createQueryBuilder('p')
      .select(['p', 'user.id', 'user.fullName', 'user.phone', 'user.image', 'store.id', 'store.name', 'store.address', 'store.contact', 'store.location', 'company.image'])
      .innerJoin("p.user", "user")
      .innerJoin("p.store", "store")
      .innerJoin("store.company", "company")
  }

  async apply(orderId: number, user: User) {
    const balance = await this.balanceRepository.findOneBy({ userId: user.id });

    if (!balance)
      throw new BadRequestException({ codeError: ErrorCode.NOTBALANCE, message: `The deliveryman does not have a balance sheet record` });

    const order = await this.orderRepository.createQueryBuilder('o')
      .select(['o.deliveryFee', 'o.payment']).where({ id: orderId }).getOne();

    //Deliveryman's profit.
    const deliverymanProfit = order.deliveryFee * balance.profit;
    //App's profit.
    const deliveryAppProfit = order.deliveryFee - deliverymanProfit;

    // order.payment == TypesPayment.cash && 
    if (deliveryAppProfit > balance.balance)
      throw new BadRequestException({ codeError: ErrorCode.INSUFFICIENTBALANCE, message: `The delivery person has no balance to take the order` });

    try {
      const response = await this.orderRepository.createQueryBuilder('o')
        .update({ deliveryman: user, status: StatusOrder.ASSIGNED, deliverymanProfit, deliveryAppProfit })
        .where({ id: orderId, status: StatusOrder.STARTED, deliveryman: IsNull() }).execute();

      if (response.affected > 0) {
        if (order.payment == TypesPayment.cash) {
          //We subtract the value of the profit from the application of the deliveryman's balance.
          balance.balance -= deliveryAppProfit;
        } if (order.payment == TypesPayment.money) {
          balance.amount += deliverymanProfit;
        }
        await this.balanceRepository.save(balance);

        return this._getOrderAndNotify(orderId, user.id);
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }

    throw new BadRequestException({ codeError: ErrorCode.ORDERFULFILLED, message: `Order with id ${orderId} already attended` });
  }

  async _getOrderAndNotify(orderId: number, deliverymanId: number) {
    const petition = await this._queryPetition()
      .where('p.id = :id AND p.deliverymanId = :deliverymanId', { id: orderId, deliverymanId: deliverymanId }).getOne();

    if (petition) {
      const data = {
        "type": TypesNotification.CHANGE_ORDER_STATUS,
        "status": `${petition.status}`,
        "orderId": `${orderId}`
      };
      this.notificationService.notify(petition.user.id, data);
      return { petition }
    }
  }

  async collect(orderId: number, user: User) {
    try {
      const response = await this.orderRepository.createQueryBuilder()
        .update({ status: StatusOrder.TAKEN })
        .where({ id: orderId, status: StatusOrder.ASSIGNED, deliveryman: user }).execute();

      if (response.affected > 0) {
        return this._getOrderAndNotify(orderId, user.id);
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
    throw new NotFoundException(`Order with id ${orderId} already picked up`);
  }

  async deliver(orderId: number, user: User, collectPetitonDto: CollectPetitonDto) {
    const { scoreDeliveryman } = collectPetitonDto;
    try {
      const response = await this.orderRepository.createQueryBuilder()
        .update({ status: StatusOrder.DELIVERED, scoreDeliveryman: scoreDeliveryman, })
        .where({ id: orderId, status: StatusOrder.TAKEN, deliveryman: user }).execute();

      if (response.affected > 0) {
        return this._getOrderAndNotify(orderId, user.id);
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }

    throw new NotFoundException(`Order with id ${orderId} already delivered`);
  }

  async cancel(orderId: number, user: User) {
    const order = await this.orderRepository.createQueryBuilder('o')
      .select(['o.total', 'o.deliverymanProfit', 'o.deliveryAppProfit', 'o.payment', 'user.id'])
      .innerJoin("o.user", "user")
      .where({ id: orderId, status: StatusOrder.ASSIGNED })
      .getOne();

    if (!order)
      throw new NotFoundException(`Order with id ${orderId} already not ASSIGNED`);

    const balanceDeliveryman = await this.balanceRepository.findOneBy({ userId: user.id });

    if (!balanceDeliveryman)
      throw new NotFoundException(`The deliveryman does not have a balance sheet record`);

    let balanceClient = null;
    if (order.payment == TypesPayment.money) {
      balanceClient = await this.balanceRepository.findOneBy({ userId: order.user.id });
      if (!balanceClient)
        throw new NotFoundException(`The client does not have a balance sheet record`);
    }

    try {
      const response = await this.orderRepository.createQueryBuilder()
        .update({ status: StatusOrder.CANCELLED })
        .where({ id: orderId, status: StatusOrder.ASSIGNED, deliveryman: user }).execute();

      if (response.affected > 0) {

        if (order.payment == TypesPayment.money) {
          balanceClient.money += order.total;
          balanceDeliveryman.amount -= order.deliverymanProfit;

          await this.balanceRepository.save(balanceClient);
          await this.balanceRepository.save(balanceDeliveryman);

        } else if (order.payment == TypesPayment.cash) {

          balanceDeliveryman.balance += order.deliveryAppProfit;
          await this.balanceRepository.save(balanceDeliveryman);
        }

        return this._getOrderAndNotify(orderId, user.id);
      }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }

    throw new NotFoundException(`Order with id ${orderId} already not ASSIGNED`);
  }

  async activate(activatePetitionDto: ActivatePetitionDto, user: User) {
    const { idDevice, isOnline, latitude, longitude } = activatePetitionDto;
    try {
      await this.sessionRepository.createQueryBuilder('s')
        .update({ isOnline, location: `${latitude}, ${longitude}` })
        .where({ user, idDevice }).execute();
      return true;
    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

}
