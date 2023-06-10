import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const MEDICAL_CERTIFICATE_URL = `${publicRuntimeConfig.MEDICAL_CERTIFICATE_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const MEDICAL_CERTIFICATE_TYPE: { [key: string]: string } = {
  'medical-certificate': 'Medical Certificate',
};
export const MEDICAL_CERTIFICATE_DESCRIPTION: { [key: string]: string } = {
  'unfit-for-duty': 'Unfit for Duty',
};
export const MEDICAL_CERTIFICATE_DIAGNOSIS: { [key: string]: string } = {
  fever: 'Fever',
  headache: 'Headache',
  cough: 'Cough',
};
export const MEDICAL_CERTIFICATE_PRACTITIONER_NAME: { [key: string]: string } = {
  'dr-dev': 'Dr [DEV] Speedoc SG',
};
export const MEDICAL_CERTIFICATE_EMAIL_TO: { [key: string]: string } = {
  van1: 'Armin.van@gmail.com',
  van2: 'Armin.van.2@gmail.com',
};

export const MEDICAL_RECORD_ACTIONS = {
  GET_MC: 'get-medical-certificate',
  ADD_MC: 'add-medical-certificate',
  EDIT_MC: 'edit-medical-certificate',
  EMAIL_MC: 'email-medical-certificate',
  DELETE_MC: 'delete-medical-certificate',
};
