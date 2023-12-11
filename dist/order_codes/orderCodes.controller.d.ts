import { OrderCodes_Service } from 'src/order_codes/orderCodes.service';
import { datesOrder, NewOrderCode } from './orderCodes.types';
export declare class OrderCodes_Controller {
    private SerServiceOrders;
    constructor(SerServiceOrders: OrderCodes_Service);
    create(validateorder: NewOrderCode): Promise<string>;
    events(validateorder: datesOrder): Promise<string>;
}
