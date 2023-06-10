import ApiService from 'common/api';
import { ReferralDestination } from 'modules/medical-record/types/referral';
import { ApiResponse } from 'share-components';

class ReferralProxyService extends ApiService {
  getReferralDestination(): Promise<ApiResponse<ReferralDestination[]>> {
    return this.get('/referral/destination');
  }
}

const referralProxyService = new ReferralProxyService({ baseURL: '/api' });

export default referralProxyService;
