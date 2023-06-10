import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const PREMISE_API_URL = `${publicRuntimeConfig.ORGANISATION_MS_URL}/${publicRuntimeConfig.API_VERSION}/premise`;

export const TABS = {
  DETAIL: 1,
  CONTACT: 2,
  FINANCE: 3,
  TIMEZONE: 4,
  TIMESLOT: 5,
  HOLIDAY: 6,
};

export interface PremiseOptions {
  id: number;
  name: string;
}

export type Mode = 'Instance' | 'Category';
export const MODE: Record<Mode, string> = {
  Instance: 'Instance',
  Category: 'Category',
};
export type Form = 'building' | 'vehicle' | 'form' | 'road' | 'virtual' | 'other';
export const FORM: Record<Form, string> = {
  building: 'Building',
  vehicle: 'Vehicle',
  form: 'Form',
  road: 'Road',
  virtual: 'Virtual',
  other: 'Other',
};
export type OperationalStatus = 'closed' | 'houseKeeping' | 'occupied' | 'unoccupied' | 'contaminated' | 'isolated';
export const OPERATIONALSTATUS: Record<OperationalStatus, string> = {
  closed: 'Closed',
  houseKeeping: 'HouseKeeping',
  occupied: 'Occupied',
  unoccupied: 'Unoccupied',
  contaminated: 'Contaminated',
  isolated: 'Isolated',
};
export type Status = 'active' | 'supended' | 'inactive';
export const STATUS: Record<Status, string> = {
  active: 'Active',
  supended: 'Supended',
  inactive: 'Inactive',
};
