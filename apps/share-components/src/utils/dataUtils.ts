import DefaultRecord from '../types/default-record';

export interface Phone extends DefaultRecord {
  id: number;
  number: string;
  countryCode: number;
  preferred: boolean;
  isoNumber: string;
  exitCode: number;
  areaCode: number;
  extension: number;
  type: string;
}

export interface Email extends DefaultRecord {
  id: number;
  email: string;
  type: string;
  preferred: boolean;
  verifiedAt: string;
}

export type AddressPurpose = 'home' | 'work' | 'old' | 'not applicable';

export interface Address extends DefaultRecord {
  id: number;
  name: string;
  text: string;
  purpose: AddressPurpose;
  floorNo: string;
  unitNo: string;
  line1: string;
  line2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postal: string;
  isPrimary?: boolean;
  preferred: boolean;
}

export const isDataProps = <DataProps extends Record<string, any>>(object: unknown): object is DataProps =>
  object !== null && typeof object === 'object';

export const getPhoneNumber = (phones?: Phone[]) => {
  if (phones?.length) {
    const defaultPhoneNumber = phones[0];
    const preferredPhoneNumber = phones.find(it => it.preferred);
    if (preferredPhoneNumber) return `+${preferredPhoneNumber.countryCode} ${preferredPhoneNumber.number}`;
    return `+${defaultPhoneNumber.countryCode} ${defaultPhoneNumber.number}`;
  }

  return '';
};

export const getEmail = (emails?: Email[]) => {
  if (emails?.length) {
    const defaultEmail = emails[0];
    const preferredEmail = emails.find(it => it.preferred);
    if (preferredEmail) return preferredEmail.email;
    return defaultEmail.email;
  }

  return '';
};

export const getAddress = (addresses?: Address[]) => {
  if (addresses?.length) {
    const address = addresses.find(it => it.preferred) || addresses[0];
    const addressLine2 = address.line2 ? `, ${address.line2} ` : ' ';
    return `${address.line1}${addressLine2}, ${address.floorNo}, ${address.unitNo}, ${address.country ?? ''} ${
      address.postal
    }`;
  }

  return '';
};
