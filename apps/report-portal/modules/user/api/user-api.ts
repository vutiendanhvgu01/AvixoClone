import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { USMS_API_KEY, USMS_API_URL } from 'common/constants';
import {
  RequestOtpPayload,
  RequestOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from 'modules/user/api/user-api-type';

class UserApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: USMS_API_URL, headers: { 'x-api-key': USMS_API_KEY } }, context);
  }

  requestOtp(payload: RequestOtpPayload): Promise<ApiResponse<RequestOtpResponse>> {
    const url = `/hward/vitals/otp/request`;
    return this.post(url, payload);
  }

  verifyOtp(payload: VerifyOtpPayload): Promise<ApiResponse<VerifyOtpResponse>> {
    const url = `/hward/vitals/otp/verify`;
    return this.post(url, payload);
  }
}

export default UserApiService;
