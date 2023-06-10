import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
// eslint-disable-next-line import/prefer-default-export
export const CATALOG_MS_URL = `${publicRuntimeConfig.CATALOG_MS_URL}/${publicRuntimeConfig.API_VERSION}`;
