import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// eslint-disable-next-line import/prefer-default-export
export const AUTH_URL = `${publicRuntimeConfig.AUTH_MS_URL}`;
export const CLIENT_ACCOUNT = `${publicRuntimeConfig.CLIENT_ACCOUNT}`;
