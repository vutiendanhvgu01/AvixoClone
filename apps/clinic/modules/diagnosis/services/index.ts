import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { DIAGNOSIS_MS_URL } from '../constants';
import { Diagnosis } from '../types/diagnosis';

class DiagnosisApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: DIAGNOSIS_MS_URL }, context);
  }

  getDiagnosesByPatient(patientId: number | string): Promise<ApiResponse<Diagnosis[]>> {
    return this.get('/diagnosis', { params: { patientId } });
  }

  getDiagnosesSnomedList(params?: Record<string, any>): Promise<ApiResponse<Diagnosis[]>> {
    return this.get('/diagnosis/list/snomed', { params });
  }

  getDiagnosesICD10List(params?: Record<string, any>): Promise<ApiResponse<Diagnosis[]>> {
    return this.get('/diagnosis/list/icd10', { params });
  }

  createDiagnose(data: Record<string, any>): Promise<ApiResponse<any>> {
    return this.post('/diagnosis', data);
  }
}

export default DiagnosisApiService;
