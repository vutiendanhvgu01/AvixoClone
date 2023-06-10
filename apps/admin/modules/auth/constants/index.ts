import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const AUTH_URL = `${publicRuntimeConfig.AUTH_MS_URL}`;
export const API_VERSION = `${publicRuntimeConfig.API_VERSION}`;
