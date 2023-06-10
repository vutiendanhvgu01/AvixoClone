import ApiService from 'common/api';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import getConfig from 'next/config';
import { GetServerSidePropsContext } from 'next';
import { Organisation } from '../types/organisation-types';
import Premise from '../types/premise-types';

const { publicRuntimeConfig } = getConfig();
const ORGANISATION_API_URL = `${publicRuntimeConfig.ORGANISATION_MS_URL}/${publicRuntimeConfig.API_VERSION}`;

class OrganisationApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: ORGANISATION_API_URL }, context);
  }

  getOrganizationDetails(id: string | number): Promise<ApiResponse<Organisation>> {
    return this.get(`/organisation/${id}`);
  }

  getPremiseDetails(id: string | number): Promise<ApiResponse<Premise>> {
    return this.get(`/premise/${id}`);
  }

  getOrganizations(
    params: { isParent?: boolean; parentOrganisationId?: number } = {},
  ): Promise<ApiResponse<Organisation[]>> {
    return this.get('/organisation', { params });
  }

  getPremises(params: { organisationId?: number } = {}): Promise<ApiResponse<Premise[]>> {
    return this.get('/premise', { params });
  }
}

export default OrganisationApiService;
