import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// eslint-disable-next-line import/prefer-default-export
export const MEDICAL_RECORD_MS_URL = `${publicRuntimeConfig.MEDICAL_RECORD_MS_URL}/${publicRuntimeConfig.API_VERSION}`;
