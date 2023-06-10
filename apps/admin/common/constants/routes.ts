import getConfig, { setConfig } from 'next/config';
import { publicRuntimeConfig } from '../../next.config';

setConfig({ publicRuntimeConfig });

const publicRuntimeConfigAvixo = getConfig().publicRuntimeConfig;
const BASE_URL = `${publicRuntimeConfigAvixo.BASE_URL}`;

const routes = {
  '/': `${BASE_URL}/`,
  '/login': `${BASE_URL}/login`,
  '/parent-organization': `${BASE_URL}/parent-organization`,
};

export default routes;
