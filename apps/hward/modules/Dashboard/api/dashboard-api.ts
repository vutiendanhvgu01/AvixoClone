import getConfig from 'next/config';
import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { CreateAxiosDefaults } from 'share-components';
import { GetStatsParams, type GetStatsReturnType } from './dashboard-api-type';

const { publicRuntimeConfig } = getConfig();
const BOOKING_SERVICE_URL = `${publicRuntimeConfig.BOOKING_SERVICE_URL}/v1/hward`;
const BOOKING_SERVICE_API_KEY = `${publicRuntimeConfig.BOOKING_SERVICE_API_KEY}`;

class DashboardApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: BOOKING_SERVICE_URL, headers: { 'x-api-key': BOOKING_SERVICE_API_KEY } }, context);
  }

  getStats(params: GetStatsParams): GetStatsReturnType {
    return this.get('stats', { params });
  }
}

export default DashboardApiService;
