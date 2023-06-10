export interface PhoneNumber {
  countryCode: string;
  phoneValue: string;
  isPrimary: boolean;
}
export interface Category {
  id: number;
  name: string;
}

export interface Timezone {
  id: number;
  name: string;
  code: string;
  offset: string;
}

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
}
