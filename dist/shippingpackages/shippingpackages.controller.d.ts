import { ShippingPackagesService } from 'src/shippingpackages/shippingpackages.service';
import { Datasend, FedExRequest, Datalabel } from './shippingpackages.types';
export declare class ShippingPackagesController {
    private shippingpackages;
    constructor(shippingpackages: ShippingPackagesService);
    events(): Promise<string>;
    RequestPurchaseTickets(SendRequest: Datasend): Promise<any[]>;
    shipmentsfedex(FedExRequ: FedExRequest): Promise<any[]>;
    generatelabel(datalabel: Datalabel): Promise<any[]>;
}
