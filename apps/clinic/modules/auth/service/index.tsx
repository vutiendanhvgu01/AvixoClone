import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { AUTH_MS_URL } from '../constants';
import { Credential, Role } from '../types';

class AuthApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: AUTH_MS_URL }, context);
  }

  getCredentialByPractitionerId(practitionerId: number | string): Promise<ApiResponse<Credential>> {
    return this.get(`/credential/account/${practitionerId}`);
  }

  getRoleByCredentialId(credentialId: number | string): Promise<ApiResponse<Role[]>> {
    return this.get(`/credential/${credentialId}/role`);
  }

  addRoleForCredential(credentialId: number | string, params: Record<string, any>): Promise<ApiResponse<any>> {
    return this.post(`/credential/${credentialId}/role`, params);
  }

  removeRoleByCredentialId(credentialId: number | string, params: Record<string, any>): Promise<ApiResponse<any>> {
    return this.delete(`/credential/${credentialId}/role`, { data: params });
  }
}

export default AuthApiService;
