import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
type Color = 'info' | 'default' | 'warning' | 'error';

export const ALLERGY_API_URL = `${publicRuntimeConfig.ALLERGY_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export const SEVERITY_COLOR: { [key: string]: Color } = {
  mild: 'info',
  moderate: 'warning',
  severe: 'error',
  unknown: 'default',
};

export const CRITICALITY_COLOR: { [key: string]: Color } = {
  low: 'info',
  high: 'warning',
  'unable-to-assess': 'error',
  unknown: 'default',
};

export const ALLERGY_TYPE: { [key: string]: string } = {
  allergy: 'Allergy',
  'adverse-event': 'Adverse Event',
  alert: 'Alert',
};

export const ALLERGY_SUSPECTED_DRUG: { [key: string]: string } = {
  yes: 'true',
  no: 'false',
};

export const ALLERGY_SUB_TYPE: { [key: string]: string } = {
  food: 'Food',
  medication: 'Medication',
  environment: 'Environment',
  biologic: 'Biologic',
  other: 'Other',
};

export const ALLERGY_SEVERITIY: { [key: string]: string } = {
  mild: 'Mild',
  moderate: 'Moderate',
  severe: 'Severe',
  unknown: 'Unknown',
};

export const ALLERGY_CRITICALITY: { [key: string]: string } = {
  low: 'Low',
  high: 'High',
  'unable-to-assess': 'Unable to assess',
  unknown: 'Unknown',
};

export const ALLERGY_VERIFICATION_STATUS: { [key: string]: string } = {
  unconfirmed: 'Unconfirmed',
  presumed: 'Presumed',
  confirmed: 'Confirmed',
  refuted: 'Refuted',
  'entered-in-error': 'Entered in error',
};

export const ALLERGY_CLINICAL_STATUS: { [key: string]: string } = {
  active: 'Active',
  inactive: 'Inactive',
  resolved: 'Resolved',
};

export const ALLERGY_INFORMATION_SOURCE: { [key: string]: string } = {
  patient: 'Patient-Reported',
  practitioner: 'Directly Observed',
  'related-person': 'Reported by Next of Kin',
  'medical-records': 'Transcribed from Medical Records',
  others: 'Others',
  unknown: 'Unknown',
};
