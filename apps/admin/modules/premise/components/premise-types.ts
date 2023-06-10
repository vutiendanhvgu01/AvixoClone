import { TimeSlot } from '@ShareComponents/AvixoTimeSlot/time-slot-type';
import { Holiday } from '@ShareComponents/HolidaySection/HolidayForm/holiday-form-type';
import { Currency, Timezone } from 'common/types';
import { DefaultRecord } from 'share-components';

export type PremiseStatus = 'active' | 'suspended' | 'inactive';

export default interface Premise extends DefaultRecord {
  uuid: number;
  premiseID: string;
  isEdit: boolean;
  tab?: number;
  status: PremiseStatus;
  name: string;
  typeCode: string;
  companyName: string;
  companyRegNo: string;
  hospitalCode: string;
  hciCode: string;
  heCode: string;
  partOfPremise: string;
  typeName: string;
  parentOrganization: string;
  description?: string;
  currency?: Currency;
  taxRate?: number;
  nirCode: string;
  timezone?: Timezone;
  addresses: any[];
  phones: any[];
  emails: any[];
  operationalStatus?: string;
  alias?: string;
  currencyID?: number;
  timezoneID?: number;
  form?: string;
  parentOrganisationID: number;
  priority?: number;
  isDefault?: boolean;
  logo?: string;
  mode: string;
  timeslots?: TimeSlot[];
  holidays?: Holiday[];
}
