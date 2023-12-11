import { Repository } from 'typeorm';
import { orderCodes } from './entities/orders.entity';
import { datesOrder, NewOrderCode } from './orderCodes.types';
export declare class OrderCodes_Service {
    private readonly setOrderCodes;
    constructor(setOrderCodes: Repository<orderCodes>);
    getValidOrder(validateorder: datesOrder): Promise<any>;
    createOrderCode(validateorder: NewOrderCode): Promise<any>;
    GenerateCode(idUsers: any): Promise<any>;
}
