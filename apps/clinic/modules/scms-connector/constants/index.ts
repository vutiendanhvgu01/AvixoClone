/* eslint-disable import/prefer-default-export */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const SCMS_CONNECTOR_MS_URL = `${publicRuntimeConfig.SCMS_CONNECTOR_MS_URL}/${publicRuntimeConfig.API_VERSION}`;
