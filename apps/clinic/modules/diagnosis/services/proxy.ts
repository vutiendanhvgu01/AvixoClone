import ApiService from 'common/api';
import { ApiResponse } from 'share-components';
import { Diagnosis } from '../types/diagnosis';

class DiagnosisProxyService extends ApiService {
  getDiagnosesByPatient(patientId: number | string): Promise<ApiResponse<Diagnosis[]>> {
    return this.get(`/diagnoses/patientId/${patientId}`);
  }

  getDiagnosesSnomedList(params?: Record<string, any>): Promise<ApiResponse<Diagnosis[]>> {
    return this.get(`/diagnoses/snomed`, {
      params,
    });
  }

  getDiagnosesICD10List(params?: Record<string, any>): Promise<ApiResponse<Diagnosis[]>> {
    return this.get(`/diagnoses/icd10`, {
      params,
    });
  }
}

export default new DiagnosisProxyService({ baseURL: '/api' });
