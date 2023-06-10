import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const AUTH_URL = `${publicRuntimeConfig.AUTH_MS_URL}`;
export const BASE_URL = `${publicRuntimeConfig.BASE_URL}`;
export const API_VERSION = `${publicRuntimeConfig.API_VERSION}`;
export const AUTH_MS_URL = `${AUTH_URL}/${API_VERSION}`;
