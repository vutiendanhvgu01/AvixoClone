import { FlagProvider } from '@unleash/nextjs';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { UNLEASH_FRONTEND_API_URL, UNLEASH_FRONTEND_API_TOKEN, UNLEASH_APP_NAME } = publicRuntimeConfig;

const unleashConfig: Parameters<typeof FlagProvider>[0]['config'] = {
  appName: UNLEASH_APP_NAME,
  url: UNLEASH_FRONTEND_API_URL,
  clientKey: UNLEASH_FRONTEND_API_TOKEN,
  disableRefresh: true,
};

export default unleashConfig;
