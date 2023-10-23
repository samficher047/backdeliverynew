import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Session } from '../auth/entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterKM } from '../common/glob/filter';
import { Order } from '../client/market/entities/order.entity';
import { StatusOrder } from 'src/common/glob/status';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

  ) {
    const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIAL_JSON);
    firebase.initializeApp({ credential: firebase.credential.cert(firebaseCredentials) });
  }

  async notify(userId: number, data: { [key: string]: string; }) {
    const sessions = await this.sessionRepository.createQueryBuilder('s')
      .select(['s.tokenPush'])
      .where('s.userId = :userId', { userId: userId }).getMany();

    const tokens = sessions.map(session => session.tokenPush);
    if (tokens.length > 0) firebase.messaging().sendMulticast({ tokens, data, android: { ttl: 0 } });
  }

  async notifyOrder(orderId: number, latitude: number, longitude: number, data: { [key: string]: string; }) {
    const sessionsDeliveryman = await this.sessionRepository.createQueryBuilder('s')
      .select(['s.tokenPush'])
      .where(this.sqlFilterDeliveryMan(latitude, longitude), { km: FilterKM.DELIVERYMAN }).getMany();

    const tokensDeliveryman = sessionsDeliveryman.map(session => session.tokenPush);
    let count = 0;
    if (tokensDeliveryman.length > 0) this.sendOrder(orderId, tokensDeliveryman, data, count);

    const order = await this.orderRepository.createQueryBuilder('p')
      .select(['p.id', 'store.id', 'user.id',])
      .innerJoin("p.store", "store")
      .innerJoin("store.user", "user")
      .where('p.id = :orderId', { orderId })
      .getOne();

    // Notifies the order to the user who registered the store (rol manager)
    this.notify(order.store.user.id, data);
  }

  async sendOrder(orderId: number, tokens: string[], data: { [key: string]: string; }, count: number) {
    firebase.messaging().sendMulticast({ tokens, data, android: { ttl: 0 } });
    count++;
    if (count > 4) return;
    await new Promise(resolve => setTimeout(resolve, 8000));
    const order = await this.orderRepository.createQueryBuilder('p').select(['p.id'])
      .where("p.id = :orderId AND p.status = :status", { orderId, status: StatusOrder.STARTED }).getOne();
    if (order) this.sendOrder(orderId, tokens, data, count);
  }

  private sqlFilterDeliveryMan = (latitude: number, longitude: number):
    string =>
    `
    s.isOnline = true AND s.location IS NOT NULL AND
    ST_DistanceSphere( 
    ST_GeomFromText('POINT(${latitude} ${longitude})'), 
      s.location::geometry) 
    <= :km
    `;

}
