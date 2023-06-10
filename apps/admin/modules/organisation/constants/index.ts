import getConfig from 'next/config';
import { Organisation } from '../components/organisation-types';

const { publicRuntimeConfig } = getConfig();

export const ORGANISATION_API_URL = `${publicRuntimeConfig.ORGANISATION_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const ORGANISATION_STATUS_COLOR: Record<Organisation['status'], 'secondary' | 'error' | 'warning'> = {
  active: 'secondary',
  suspended: 'warning',
  inactive: 'error',
};

export const ORGANISATION_TABS: string[] = ['Parent Organisation', 'Organisation', 'Premise', 'Practitioner'];

export const ORGANISATION_ACTION = {
  ADD_ORGANISATION: 'add-organisation',
  DELETE_ORGANISATION: 'delete-organisation',
  ADD_PREMISE: 'add-premise',
  DELETE_PREMISE: 'delete-premise',
  ADD_PRACTITIONER: 'add-practitioner',
  DELETE_PRACTITIONER: 'delete-practitioner',
};

export const ORGANISATION_DETAILS = {
  ORGANISATION_INFOMATION: 0,
  CONTACT_INFOMATION: 1,
  FINANCE_INFOMATION: 2,
  TIMEZONE: 3,
  QUALIFICATION: 4,
};
