import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const BASE_URL = `${publicRuntimeConfig.BASE_URL}`;
export const API_VERSION = `${publicRuntimeConfig.API_VERSION}`;
