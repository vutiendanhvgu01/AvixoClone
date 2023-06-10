import ApiService from 'common/api';
import {
  GetCaseParams,
  GetCaseReturnType,
  GetCasesParams,
  GetCasesReturnType,
  GetPatientCasesParams,
  GetPatientCasesReturnType,
} from './shared';

class CaseProxyService extends ApiService {
  // Shall be used in handling pagination
  getCases(params: GetCasesParams): GetCasesReturnType {
    return this.get(`/cases`, { params });
  }

  getPatientCases(params: GetPatientCasesParams): GetPatientCasesReturnType {
    return this.get(`/patient/${params.patientRef}/cases`, { params });
  }

  getCaseDetails(id: string, params: GetCaseParams): GetCaseReturnType {
    return this.get(`/cases/${id}`, { params });
  }
}

const caseProxyService = new CaseProxyService({ baseURL: '/api' });

export default caseProxyService;
