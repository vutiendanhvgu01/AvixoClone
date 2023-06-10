import { GetServerSidePropsContext } from 'next';
import { ApiResponse } from 'share-components';
import { AUTH_URL, API_VERSION } from '../constants';
import { PayloadUser } from './auth-api-type';
import ApiService from '../../../common/api';

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
}

export default AuthApiService;
