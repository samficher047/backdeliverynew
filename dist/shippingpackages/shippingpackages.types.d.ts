interface Package {
    weight: number;
    height: number;
    width: number;
    length: number;
    volumetric: number;
    type: string;
    main_weight: number;
}
interface Origin {
    country: string;
    postal_code: string;
}
interface Destination {
    country: string;
    postal_code: string;
}
export interface Datasend {
    type: string;
    origin: Origin;
    destination: Destination;
    packages: Package[];
    carriers: string[];
    insurance: number;
}
interface Address {
    postalCode: number;
    countryCode: string;
}
interface Value {
    value: string;
}
interface Weight {
    units: string;
    value: number;
}
interface Dimensions {
    length: number;
    width: number;
    height: number;
    units: string;
}
interface RequestedPackageLineItem {
    weight: Weight;
    dimensions: Dimensions;
}
interface RequestedShipment {
    shipper: {
        address: Address;
    };
    recipient: {
        address: Address;
    };
    pickupType: string;
    serviceType: string;
    rateRequestType: string[];
    requestedPackageLineItems: RequestedPackageLineItem[];
}
export interface FedExRequest {
    accountNumber: Value;
    requestedShipment: RequestedShipment;
}
interface Origin {
    city: string;
    company: string;
    country: string;
    district: string;
    email: string;
    int_number: string;
    name: string;
    number: string;
    phone: string;
    postal_code: string;
    reference: string;
    state: string;
    street: string;
}
interface Destination {
    city: string;
    company: string;
    country: string;
    district: string;
    email: string;
    name: string;
    number: string;
    phone: string;
    postal_code: string;
    reference: string;
    state: string;
    street: string;
}
interface Shipment {
    carrier: string;
    contentExplanation: string;
    contentQuantity: number;
    ObjectId: string;
    price: number;
    service: string;
    ShippingId: string;
}
interface Package {
    content: string;
    contentQuantity: number;
    declared_value: number;
    height: number;
    weight: number;
    width: number;
    length: number;
    type: string;
    name: string;
    volumetric: number;
    main_weight: number;
}
export interface Datalabel {
    origin: Origin;
    destination: Destination;
    shipment: Shipment;
    insurance: number;
    packages: Package[];
    service_id: string;
    carriers: string[];
}
export {};
