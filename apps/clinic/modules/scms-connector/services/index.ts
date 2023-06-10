import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { AVIXO_SERVICE_NAME } from 'modules/nehr-connector/constants';
import { SCMS_CONNECTOR_MS_URL } from '../constants';

class SCMSConnectorApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super(
      {
        ...config,
        baseURL: SCMS_CONNECTOR_MS_URL,
        headers: { 'Service-Name': AVIXO_SERVICE_NAME, ...config?.headers },
      },
      context,
    );
  }

  createDiagnoses(data: any): Promise<ApiResponse> {
    return this.post('/bau/cdlens/diagnosis', data);
  }

  getPatientsEnrolled(params: { dateFrom: string; dateTo: string }): Promise<ApiResponse> {
    return this.get('/hsg/enrolment/pcp/patient', { params });
  }

  submitHSGReferral(referralId: string | number): Promise<ApiResponse> {
    return this.post(`/hsg/referral/${referralId}`, {});
  }

  getVaccinationHistory(): Promise<ApiResponse> {
    return this.post(`/bau/vcdss/vaccination-claim-history`, {});
  }
}

export default SCMSConnectorApiService;
