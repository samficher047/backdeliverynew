export interface dataUsers {
  id_user: number;
  name: string;
  lastname: string;
  email: string;
  phone: number;
  birthdate: string;
  gender: string;
}

export interface dataAddresUser {
    id_address: number;
  id_user: number;
  country: string;
  state: string;
  city: string;
  contry_code: number;
  delegation: string;
  street: string;
  number: number;
  interior_num: number;
  type: number;
  reference: string;
}

export interface databilling {
  id_user: number;
  rfc: string;
  type_of_person: string;
  legal_name: string;
  payment_method: string;
  tax_regime: string;
  name: string;
  email: string;
  phone: number;
}

export interface dataAddressFiscal {
  id_user: number;
  street: string;
  neighborhood: string;
  number: number;
  num_inter: number;
  contry_code: number;
  city: string;
}
