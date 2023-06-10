/* eslint-disable import/prefer-default-export */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const PATIENT_MS_URL = `${publicRuntimeConfig.PATIENT_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const IDENTITY_ID_TYPE: { [key: string]: string } = {
  'national-id': 'National Id',
  'driver-license': 'Driver License',
  passport: 'Passport',
  other: 'Other',
};

export const PATIENT_STATUS_COLOR: { [key: string]: string } = {
  active: 'success',
  inactive: 'error',
};

export const PATIENT_MANAGEMENT_ACTION = {
  ADD_PATIENT: 'add-patient',
  CREATE_PRESCIPTION: 'create-prescription',
  SEARCH: 'search',
};

export const HSG_LIST_RECENTLY_ENROLLED = 'HSG List - Recently Enrolled';

export const DEFAULT_PAGE_SIZE_PATIENT = 100;
