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

// const data: SendRequest = {
//   type: 'National',
//   origin: {
//     country: 'MX',
//     postal_code: '64000',
//   },
//   destination: {
//     country: 'MX',
//     postal_code: '64380',
//   },
//   packages: [
//     {
//       weight: 1,
//       height: 10,
//       width: 10,
//       length: 10,
//       volumetric: 0.2,
//       type: 'box',
//       main_weight: 1,
//     },
//   ],
//   carriers: ['fedex', 'estafeta', 'ampm', 'jtexpress'],
//   insurance: 0,
// };

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

// const fedexRequest: FedExRequest = {
//   accountNumber: {
//     value: '740561073',
//   },
//   requestedShipment: {
//     shipper: {
//       address: {
//         postalCode: 50090,
//         countryCode: 'MX',
//       },
//     },
//     recipient: {
//       address: {
//         postalCode: 54409,
//         countryCode: 'MX',
//       },
//     },
//     pickupType: 'DROPOFF_AT_FEDEX_LOCATION',
//     serviceType: 'FEDEX_1_DAY_FREIGHT',
//     rateRequestType: ['LIST', 'ACCOUNT'],
//     requestedPackageLineItems: [
//       {
//         weight: {
//           units: 'KG',
//           value: 20,
//         },
//         dimensions: {
//           length: 10,
//           width: 10,
//           height: 10,
//           units: 'CM',
//         },
//       },
//     ],
//   },
// };

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

// const requestData: Data = {
//   origin: {
//     city: 'Monterrey',
//     company: 'SACR0 DESIGN',
//     country: 'MX',
//     district: 'MIRAVALLE',
//     email: 'sample_sample@drenvio.com',
//     int_number: '2',
//     name: 'SAMPLE FULL NAME',
//     number: '282',
//     phone: '8683457800',
//     postal_code: '66250',
//     reference: 'SAMPLE DISTRICT',
//     state: 'NL',
//     street: 'ANTONIO VIVALDI',
//   },
//   destination: {
//     city: 'Monterrey',
//     company: 'PARROQUIA DE NUESTRA SEÑORA DE LA PIEDAD',
//     country: 'MX',
//     district: 'Piedad Narvarte',
//     email: 'sample_sample@drenvio.com',
//     name: 'SAMPLE FULL NAME',
//     number: '320',
//     phone: '8683457800',
//     postal_code: '66260',
//     reference: 'SAMPLE DISTRICT',
//     state: 'NL',
//     street: 'Obrero Mundial',
//   },
//   shipment: {
//     carrier: 'jtexpress',
//     contentExplanation: 'EXAMPEL CONTENT',
//     contentQuantity: 1,
//     ObjectId: 'code',
//     price: 133.4,
//     service: 'ground',
//     ShippingId: 'N4',
//   },
//   insurance: 0,
//   packages: [
//     {
//       content: 'ORNAMENTOS O DECORACIONES',
//       contentQuantity: 1,
//       declared_value: 0,
//       height: 10,
//       weight: 1,
//       width: 10,
//       length: 10,
//       type: 'box',
//       name: 'Paquete enviado de pruebas',
//       volumetric: 0.2,
//       main_weight: 1,
//     },
//   ],
//   service_id: 'jtexpress_mx_D-C01_ground',
//   carriers: ['jtexpress'],
// };

export interface ShippingInfo {
  provehdor: string;
  provehdorid: string;
  ObjectId: string;
  ShippingId: string;
  service_id: string;
  carrier: string;
  currency: string;
  days: string;
  price: string;
  insurance: string;
  service: string;
}
