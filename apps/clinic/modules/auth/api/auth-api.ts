import { GetServerSidePropsContext } from 'next';
import { ApiResponse } from 'share-components';
import ApiService from '../../../common/api';
import { API_VERSION, AUTH_URL } from '../constants';
import { PayloadUser } from './auth-api-type';

class AuthApiService extends ApiService {
  constructor(context?: Partial<GetServerSidePropsContext>) {
    super({ baseURL: AUTH_URL }, context);
  }

  login(payload: PayloadUser): Promise<ApiResponse> {
    const url = `/${API_VERSION}/login`;
    return this.post(url, { password: payload.password, user_name: payload.username });
  }

  logout(): Promise<ApiResponse> {
    return this.post(`/${API_VERSION}/logout`, null);
  }

  getCredential(token: string): Promise<ApiResponse> {
    return this.get(`/${API_VERSION}/credential`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  requestOtp(sessionId: string, method = 'SMS'): Promise<ApiResponse> {
    return this.post(`/${API_VERSION}/otp/request`, {
      method,
      sessionId,
    });
  }

  verifyOtp(otp: string, sessionId: string): Promise<ApiResponse> {
    return this.post(`/${API_VERSION}/otp/verify`, {
      otp,
      sessionId,
    });
  }

  createPermission(data: any): Promise<ApiResponse<any>> {
    return this.post(`/${API_VERSION}/permission`, data);
  }

  updatePermission(id: string | number, data: any): Promise<ApiResponse<any>> {
    return this.put(`/${API_VERSION}/permission/${id}`, data);
  }

  createRole(data: any): Promise<ApiResponse<any>> {
    return this.post(`/${API_VERSION}/role`, data);
  }

  updateRole(id: string | number, data: any): Promise<ApiResponse<any>> {
    return this.put(`/${API_VERSION}/role/${id}`, data);
  }

  updatePermissionsToRole(id: string | number, roleId: string | number, data: number[]): Promise<ApiResponse<any>> {
    return this.post(`/${API_VERSION}/role/${roleId}/permission/${id}`, data);
  }

  addPermissionsToRole(roleId: string | number, data: number[]): Promise<ApiResponse<any>> {
    return this.post(`/${API_VERSION}/role/${roleId}/permission`, data);
  }

  getRoles(params?: Record<string, any>): Promise<ApiResponse> {
    return this.get(`/${API_VERSION}/role`, { params });
  }

  deleteRole(id: string | number): Promise<ApiResponse> {
    return this.delete(`/${API_VERSION}/role/${id}`);
  }

  getModuleList(): Promise<ApiResponse<any[]>> {
    return this.get(`/${API_VERSION}/role/module/list`);
  }
}

export default AuthApiService;
