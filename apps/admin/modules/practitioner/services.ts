import ApiService from 'common/api';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import getConfig from 'next/config';
import { GetServerSidePropsContext } from 'next';
import { Practitioner } from './types/practitioner';

const { publicRuntimeConfig } = getConfig();
const PRACTITIONER_API_URL = `${publicRuntimeConfig.PRACTITIONER_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

class PractitionerApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: PRACTITIONER_API_URL }, context);
  }

  getPractitioners(searchValue: string): Promise<ApiResponse<Practitioner[]>> {
    return this.get('/practitioner', { params: { name: searchValue } });
  }

  getPractitioner(practitionerId: string): Promise<ApiResponse> {
    return this.get(`/practitioner/${practitionerId}`);
  }

  deletePractitioner(practitionerId: string): Promise<ApiResponse> {
    return this.delete(`/practitioner/${practitionerId}`);
  }

  createPractitioner(data: Partial<Practitioner>): Promise<ApiResponse> {
    return this.post(`/practitioner`, data);
  }

  updatePractitioner(practitionerId: string | number, data: Partial<Practitioner>): Promise<ApiResponse> {
    return this.put(`/practitioner/${practitionerId}`, data);
  }
}

export default PractitionerApiService;
