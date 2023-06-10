import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';
import { ApiResponse } from 'share-components';
import { USMSDoctor } from './doctor-api-type';

const { publicRuntimeConfig } = getConfig();
const USMS_API_URL = `${publicRuntimeConfig.USMS_API_URL}/hward`;
const USMS_API_KEY = `${publicRuntimeConfig.USMS_API_KEY}`;

class DoctorApiService extends ApiService {
  constructor(context?: Partial<GetServerSidePropsContext>) {
    super({ baseURL: USMS_API_URL, headers: { 'x-api-key': USMS_API_KEY } }, context);
  }

  getDoctor(params: { avixoId: number }): Promise<ApiResponse<USMSDoctor>> {
    return this.get(`/`, { params });
  }
}

export default DoctorApiService;
