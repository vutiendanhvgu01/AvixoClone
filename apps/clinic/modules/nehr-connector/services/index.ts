import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { NEHR_CONNECTOR_MS_URL, AVIXO_SERVICE_NAME } from '../constants';

class NEHRConnectorApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super(
      {
        ...config,
        baseURL: NEHR_CONNECTOR_MS_URL,
        headers: { 'Service-Name': AVIXO_SERVICE_NAME, ...config?.headers },
      },
      context,
    );
  }

  submitDispenseToNEHR(id: string | number): Promise<ApiResponse> {
    return this.post(`/dispense/${id}`, {});
  }

  submitPrescriptionToNEHR(id: string | number): Promise<ApiResponse> {
    return this.post(`/prescription/${id}`, {});
  }

  submitImmunisationNEHR(id: string | number): Promise<ApiResponse> {
    return this.post(`/immunisation/${id}`, {});
  }

  sendDiagnosis(id: string | number, payload: Record<string, any>): Promise<ApiResponse> {
    return this.post(`/diagnosis/${id}`, payload);
  }


  submitAllergyToNEHR(id: string | number): Promise<ApiResponse> {
    return this.post(`/allergy/${id}`, {});
  }

  submitReferralToNEHR(referralId: string | number): Promise<ApiResponse> {
    return this.post(`/referral/${referralId}`, {});
  }

  deleteRelatedPrescription(prescriptionId: number | string): Promise<ApiResponse<string>> {
    return this.delete(`/prescription/${prescriptionId}`);
  }

  deleteRelatedPrescriptionItem(
    prescriptionId: number | string,
    itemId: number | string,
  ): Promise<ApiResponse<string>> {
    return this.delete(`/prescription/${prescriptionId}/item/${itemId}`);
  }

  deleteRelatedDispense(dispenseId: number | string): Promise<ApiResponse<string>> {
    return this.delete(`/dispense/${dispenseId}`);
  }

  deleteImmunisationNEHR(id: string | number): Promise<ApiResponse<string>> {
    return this.delete(`/immunisation/${id}`);
  }
  
  deleteAllergytoNEHR(id: number | string): Promise<ApiResponse<string>> {
    return this.delete(`/allergy/${id}`);
  }
  
  submitPatientToNEHR(id: string | number): Promise<ApiResponse> {
    return this.post(`/patient/${id}`, {});
  }

  submitUpdatedPatientToNEHR(id: string | number): Promise<ApiResponse> {
    return this.put(`/patient/${id}`, {});
  }

  deletedRelatedPatientNEHR(id: string | number): Promise<ApiResponse> {
    return this.delete(`/patient/${id}`, {});
  }
}

export default NEHRConnectorApiService;
