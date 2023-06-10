import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const KEY_ACCESS_TOKEN = 'report_portal_avixo_id';
export const USMS_API_URL = `${publicRuntimeConfig.USMS_API_URL}`;
export const USMS_API_KEY = `${publicRuntimeConfig.USMS_API_KEY}`;
