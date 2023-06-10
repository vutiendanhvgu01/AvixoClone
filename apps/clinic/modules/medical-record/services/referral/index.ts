import ApiService from 'common/api';
import { MEDICAL_RECORD_MS_URL } from 'modules/medical-record/constants';
import { Referral, ReferralDestination, ReferralFormValues } from 'modules/medical-record/types/referral';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';

class ReferralApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: MEDICAL_RECORD_MS_URL }, context);
  }

  createReferral(data: ReferralFormValues): Promise<ApiResponse<{ id: number }>> {
    return this.post('/referral', data);
  }

  getReferrallist(params?: { patientId?: number }): Promise<ApiResponse<Referral[]>> {
    return this.get('/referral', { params });
  }

  getReferralDetails(id: number | string): Promise<ApiResponse<Referral>> {
    return this.get(`/referral/${id}`);
  }

  getReferralDestination(): Promise<ApiResponse<ReferralDestination[]>> {
    return this.get('/referral-destination');
  }

  updateReferral(data: ReferralFormValues): Promise<ApiResponse<Referral>> {
    return this.put(`/referral/${data.id}`, data);
  }

  deleteReferral(referralId: number | string): Promise<ApiResponse> {
    return this.delete(`/referral/${referralId}`);
  }
}

export default ReferralApiService;
