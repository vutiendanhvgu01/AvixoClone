import ApiService from 'common/api';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import getConfig from 'next/config';
import { GetServerSidePropsContext } from 'next';
import type Premise from 'modules/premise/components/premise-types';
import { Organisation } from '../components/organisation-types';

const { publicRuntimeConfig } = getConfig();
const ORGANISATION_API_URL = `${publicRuntimeConfig.ORGANISATION_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

class OrganisationApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: ORGANISATION_API_URL }, context);
  }

  getOrganizations(
    params: { isParent?: boolean; parentOrganisationId?: number } = {},
  ): Promise<ApiResponse<Organisation[]>> {
    return this.get('/organisation', { params });
  }

  getOrganizationDetails(id: string | number): Promise<ApiResponse<Organisation>> {
    return this.get(`/organisation/${id}`);
  }

  getPremises(params: { organisationId?: number } = {}): Promise<ApiResponse<Premise[]>> {
    return this.get('/premise', { params });
  }

  getPremiseDetails(id: string | number): Promise<ApiResponse<Premise>> {
    return this.get(`/premise/${id}`);
  }

  createOrganisation(params: Partial<Organisation>): Promise<ApiResponse<any>> {
    return this.post(`/organisation`, { ...params });
  }

  deleteOrganisation(organisationId: string | number): Promise<ApiResponse<any>> {
    return this.delete(`/organisation/${organisationId}`);
  }
}

export default OrganisationApiService;
