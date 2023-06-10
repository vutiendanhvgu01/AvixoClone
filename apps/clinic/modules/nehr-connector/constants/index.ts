import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const AVIXO_SERVICE_NAME = 'AVIXO2';

const NEHR_CONNECTOR_MS_URL = `${publicRuntimeConfig.NEHR_CONNECTOR_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

export { NEHR_CONNECTOR_MS_URL, AVIXO_SERVICE_NAME };
