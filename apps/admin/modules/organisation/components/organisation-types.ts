import { Category, Currency, PhoneNumber, Timezone } from 'common/types';
import { DefaultRecord } from 'share-components';
import { Address } from 'share-components/src/components/AddressFill/AddressForm/address-form-type';
import { Qualification } from 'share-components/src/components/QualificationSection/QualificationForm/qualification-form-type';

export interface Email {
  mail: string;
  isPrimary: boolean;
}

export type OrganisationStatus = 'active' | 'suspended' | 'inactive';

export interface Organisation extends DefaultRecord {
  organisationID: string;
  status: OrganisationStatus;
  name: string;
  description?: string;
  code?: 'prov' | 'dept' | 'team' | 'govt' | 'ins' | 'pay' | 'edu' | 'reli' | 'crs' | 'cg' | 'bus' | 'other';
  companyName: string;
  companyRegNo?: string;
  taxRate?: number;
  amount: number;
  currency?: Currency;
  timezone?: Timezone;
  category?: Category;
  categoryId?: string | number;
  subCategory?: Category;
  subCategoryId?: string | number;
  isParent: boolean;
  priority?: number;
  parentOrganisationId?: number;
  partOfOrganisationId: number;
  logo?: string;
  licenseFrom: string;
  licenseTo: string;
  emails?: Record<string, any>[];
  phones?: Record<string, any>[];
  qualifications?: Qualification[];
}

type TimezoneType = number | string | null;

export interface OrganisationFormValues extends Partial<Omit<Organisation, 'id' | 'currency' | 'timeZone'>> {
  id?: number;
  image?: any;
  timeZone?: TimezoneType;
  phoneNumbers: PhoneNumber[];
  emails: Email[];
  parentOrganisation: string | number | null;
  addresses: Address[];
  currency: number | string | null;
  includeParentOrg: boolean;
}

export interface OrganisationFormPostValues extends Partial<OrganisationFormValues> {
  description?: string;
  countryCode?: string | string[];
  phoneValue?: string | string[];
  email?: string | string[];
  postal?: string | string[];
  address?: string | string[];
  blockNo?: string | string[];
  unitNo?: string | string[];
  label?: string | string[];
}

export interface OrganisationCardProps {
  organisation: Organisation;
}

export interface SwitchProps {
  values: OrganisationFormValues;
  setFieldValue: (field: string, message: boolean | string | undefined) => void;
}
