import { DefaultRecord } from 'share-components';

export interface Address {
  postal: string;
  address: string;
  unitNo: string;
  blockNo: string;
  label: string;
}
interface Category {
  id: number;
  name: string;
}

interface Timezone {
  id: number;
  name: string;
  code: string;
  offset: string;
}

interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
}

export interface Email {
  mail: string;
}

export interface Organisation extends DefaultRecord {
  organisationID: string;
  status: 'active' | 'suspended' | 'inactive';
  name: string;
  description?: string;
  code?: 'prov' | 'suspended' | 'dept' | 'team' | 'govt' | 'ins' | 'pay' | 'edu' | 'reli' | 'crs' | 'cg' | 'bus';
  companyName: string;
  companyRegNo?: string;
  taxRate?: number;
  currency?: Currency;
  timezone?: Timezone;
  category?: Category;
  subCategory?: Category;
  isParent: boolean;
  priority?: number;
  parentOrganisationId?: number;
  logo?: string;
  emails?: Record<string, any>[];
  phones?: Record<string, any>[];
}
