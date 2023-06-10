import getConfig, { setConfig } from 'next/config';
import { publicRuntimeConfig } from '../../next.config';

setConfig({ publicRuntimeConfig });

const publicRuntimeConfigAvixo = getConfig().publicRuntimeConfig;
const BASE_URL = `${publicRuntimeConfigAvixo.BASE_URL}`;

const routes = {
  '/': `${BASE_URL}/`,
  '/login': `${BASE_URL}/login`,
};

export default routes;
