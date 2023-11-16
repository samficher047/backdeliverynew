import { Datalabel, Datasend, FedExRequest } from './shippingpackages.types';
export declare class ShippingPackagesService {
    gettoken(): Promise<any>;
    getquotes(): Promise<any>;
    newrate(SendRequest: Datasend): Promise<any>;
    newratefedex(FedExRequest: FedExRequest): Promise<any[]>;
    newlabel(Datalabel: Datalabel): Promise<any>;
}
