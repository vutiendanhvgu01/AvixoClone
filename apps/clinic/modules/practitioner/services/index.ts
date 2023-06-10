import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { PRACTITIONER_API_URL } from '../constants';

class PractitionerApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: PRACTITIONER_API_URL }, context);
  }

  getPractitionersList(
    params: {
      organizationId?: string | number;
      premiseId?: string | number;
      offset?: string | number;
      limit?: string | number;
    } = {},
  ): Promise<ApiResponse> {
    return this.get('/practitioner', { params });
  }

  getPatientPractitioner(practitionerId: number | string): Promise<ApiResponse> {
    return this.get(`/practitioner/${practitionerId}`);
  }

  createPractitioner(practitioner: any): Promise<ApiResponse> {
    return this.post(`/practitioner`, practitioner);
  }

  updatePractitioner(practitionerId: string, practitioner: any): Promise<ApiResponse> {
    return this.put(`/practitioner/${practitionerId}`, practitioner);
  }

  deletePractitioner(practitionerId: string): Promise<ApiResponse> {
    return this.delete(`/practitioner/${practitionerId}`);
  }
}

export default PractitionerApiService;
