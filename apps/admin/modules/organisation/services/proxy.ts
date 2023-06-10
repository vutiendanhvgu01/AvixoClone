import ApiService from 'common/api';
import Premise from 'modules/premise/components/premise-types';
import { ApiResponse } from 'share-components';
import { Organisation } from '../components/organisation-types';

class OrganisationProxyService extends ApiService {
  getParentOrganisation(): Promise<ApiResponse<Partial<Organisation>[]>> {
    return this.get(`/organisation?isParent=true`);
  }

  getOrganizations(): Promise<ApiResponse<Organisation[]>> {
    return this.get(`/organisation`);
  }

  getPremises(params: { organisationId?: number } = {}): Promise<ApiResponse<Premise[]>> {
    return this.get(`/premise`, { params });
  }
}

const organisationProxyService = new OrganisationProxyService({ baseURL: '/api' });

export default organisationProxyService;
