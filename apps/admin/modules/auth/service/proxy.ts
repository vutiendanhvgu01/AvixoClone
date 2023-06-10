import ApiService from 'common/api';
import { ApiResponse } from 'share-components';

class AuthProxyService extends ApiService {
  requestOtp(sessionId: string, method = 'SMS'): Promise<ApiResponse> {
    return this.post(`/auth/request-otp`, {
      method,
      sessionId,
    });
  }
}

export default new AuthProxyService({ baseURL: '/api' });
