import ApiService from 'common/api';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import getConfig from 'next/config';
import { GetServerSidePropsContext } from 'next';
import type Premise from 'modules/premise/components/premise-types';

const { publicRuntimeConfig } = getConfig();
const ORGANISATION_API_URL = `${publicRuntimeConfig.ORGANISATION_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

class PremiseApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: ORGANISATION_API_URL }, context);
  }

  createPremise(params: Partial<Premise>): Promise<ApiResponse<any>> {
    return this.post(`/premise`, { ...params });
  }

  updatePremise(premiseId: string, params: Partial<Premise>): Promise<ApiResponse<any>> {
    return this.put(`/premise/${premiseId}`, { ...params });
  }

  deletePremise(premiseId: string | number): Promise<ApiResponse<any>> {
    return this.delete(`/premise/${premiseId}`);
  }
}

export default PremiseApiService;
