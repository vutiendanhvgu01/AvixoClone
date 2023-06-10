import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// eslint-disable-next-line import/prefer-default-export
export const DIAGNOSIS_MS_URL = `${publicRuntimeConfig.DIAGNOSIS_MS_URL}/${publicRuntimeConfig.API_VERSION}`;
