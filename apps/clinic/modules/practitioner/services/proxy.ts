import ApiService from 'common/api';
import { ApiResponse } from 'share-components';
import Practitioner from '../types/practitioner-types';

class PractitionerProxyService extends ApiService {
  getPractitionersList(
    params: {
      organizationId?: string | number;
      premiseId?: string | number;
    } = {},
  ): Promise<ApiResponse<Practitioner[]>> {
    return this.get('/practitioner/list', { params });
  }

  getPractitionersDetails(practitionerId: number): Promise<ApiResponse<Practitioner>> {
    return this.get(`/practitioner/${practitionerId}`);
  }
}

const practitionerProxyService = new PractitionerProxyService({ baseURL: '/api' });

export default practitionerProxyService;
