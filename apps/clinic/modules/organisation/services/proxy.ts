import ApiService from 'common/api';
import { ApiResponse } from 'share-components';
import type Premise from '../types/premise-types';
import { Organisation } from '../types/organisation-types';

class OrganisationProxyService extends ApiService {
  getPremiseDetails(id: string | number): Promise<ApiResponse<Premise>> {
    return this.get(`/premise/${id}`);
  }

  getOrganizations(): Promise<ApiResponse<Organisation[]>> {
    return this.get(`/organisation`);
  }

  getPremises(params: { organisationId?: number } = {}): Promise<ApiResponse<Organisation[]>> {
    return this.get(`/premise`, { params });
  }
}

const organisationProxyService = new OrganisationProxyService({ baseURL: '/api' });

export default organisationProxyService;
