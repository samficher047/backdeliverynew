import { OrderCodes_Service } from 'src/order_codes/orderCodes.service';
import { datesOrder } from './orderCodes.types';
export declare class OrderCodes_Controller {
    private SerServiceOrders;
    constructor(SerServiceOrders: OrderCodes_Service);
    events(validateorder: datesOrder): Promise<string>;
}
