/* eslint-disable import/prefer-default-export */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const PRESCRIPTION_MS_URL = `${publicRuntimeConfig.PRESCRIPTION_MS_URL}/${publicRuntimeConfig.API_VERSION}`;
export const INVENTORY_MS_URL = `${publicRuntimeConfig.INVENTORY_MS_URL}/${publicRuntimeConfig.API_VERSION}`;
