export type PhoneNumber = {
  ext: number;
  number: number;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type AddressSnippet = {
  fullAddress: string;
  unit: string;
  city: string;
  postalCode: string;
  country: string;
};

export type AddressFull = AddressSnippet & {
  postalCode: string | number;
  country: string;
  coordinates: Coordinates;
};

export type Gender = 'M' | 'F';

export interface Account {
  type: string;
  id: string;
  active: boolean;
  country: string;
  meta:
    | {
        pcno: string;
      }
    | {
        email: string;
        phoneNumber: PhoneNumber;
        alternatePhoneNumber?: PhoneNumber;
        address: AddressFull;
      }
    | {
        tag: string;
      };
  _id: string;
}

export interface GenericResponse {
  message: string;
  status: number;
}
