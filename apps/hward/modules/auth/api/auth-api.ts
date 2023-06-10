import { GetServerSidePropsContext } from 'next';
import { ApiResponse } from 'share-components';
import { API_VERSION } from 'common/constants/urls';
import { AUTH_URL, CLIENT_ACCOUNT } from '../constants';
import { PayloadUser, User } from './auth-api-type';
import ApiService from '../../../common/api';

class AuthApiService extends ApiService {
  constructor(context?: Partial<GetServerSidePropsContext>) {
    super({ baseURL: AUTH_URL }, context);
  }

  login(payload: PayloadUser): Promise<ApiResponse> {
    const url = `/${API_VERSION}/auth/login?client-account=${CLIENT_ACCOUNT}`;
    return this.post(url, { password: payload.password, username: payload.username });
  }

  logout(): Promise<ApiResponse> {
    return this.get(`/${API_VERSION}/auth/logout?client-account=${CLIENT_ACCOUNT}`);
  }

  me(): Promise<ApiResponse<User>> {
    return this.get(`/${API_VERSION}/auth/me?client-account=${CLIENT_ACCOUNT}`);
  }
}

export default AuthApiService;
