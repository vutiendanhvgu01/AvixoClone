import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const EMAIL_TEMPLATE_TYPES: { [key: string]: string } = {
  invoice: 'Invoice',
  medical_certificate: 'Medical Certificate',
  medical_record: 'Medical Record',
  receipt: 'Receipt',
  referral: 'Referral',
};

export const MEDICAL_CERTIFICATE_MS_URL = `${publicRuntimeConfig.MEDICAL_CERTIFICATE_MS_URL}/${publicRuntimeConfig.API_VERSION}`;
