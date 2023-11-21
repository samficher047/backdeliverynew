import { ShippingDHLService } from 'src/shipmentsdhl/shipmentsdhl.service';
export declare class ShippingDHLController {
    private shippingpackages;
    constructor(shippingpackages: ShippingDHLService);
    events(): Promise<any>;
}
