import { CreateAxiosDefaults } from 'axios';
import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse } from 'share-components';
import { VitalResponse } from './vital-api-type';
import { VitalFormPayload } from '../components/vital-form-schema';

const { AVIXO_UTILITY_API_KEY, AVIXO_UTILITY_API_URI: BASE_URL } = process.env;

class VitalApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: BASE_URL, headers: { 'X-API-KEY': AVIXO_UTILITY_API_KEY } }, context);
  }

  addVitals(
    body: VitalFormPayload,
    params: { env?: 'DEV' | 'PRODUCTION'; country: string } = { country: 'SG' },
  ): Promise<ApiResponse<VitalResponse>> {
    return this.post(`/vitals`, { ...body }, { params });
  }
}

export default VitalApiService;
