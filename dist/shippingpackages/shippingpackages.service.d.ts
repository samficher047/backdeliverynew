import { Datalabel, Datasend, FedExRequest, ShippingInfo } from './shippingpackages.types';
export declare class ShippingPackagesService {
    gettoken(): Promise<any>;
    getquotes(): Promise<any>;
    newrate(SendRequest: Datasend): Promise<any>;
    newratefedex(FedExRequest: FedExRequest): Promise<any[]>;
    newlabel(Datalabel: Datalabel): Promise<{
        tracking: any;
        label: any;
    }>;
    allrates(SendRequest: Datasend): Promise<ShippingInfo[]>;
}
