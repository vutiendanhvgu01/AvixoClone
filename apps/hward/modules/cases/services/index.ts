import ApiService from 'common/api';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import getConfig from 'next/config';
import { GetServerSidePropsContext } from 'next';
import { BlankCaseBody, BlankCaseResponse } from '../api/case-api-type';
import {
  GetCaseParams,
  GetCaseReturnType,
  GetCasesParams,
  GetCasesReturnType,
  GetPatientCasesParams,
  GetPatientCasesReturnType,
} from './shared';

const { publicRuntimeConfig } = getConfig();
const CASE_API_URL = `${publicRuntimeConfig.BOOKING_SERVICE_URL}/${publicRuntimeConfig.API_VERSION}/hward`;
const BOOKING_SERVICE_API_KEY = `${publicRuntimeConfig.BOOKING_SERVICE_API_KEY}`;

class CaseApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: CASE_API_URL, headers: { 'x-api-key': BOOKING_SERVICE_API_KEY } }, context);
  }

  // Used in visit to /cases
  getCases(params: GetCasesParams): GetCasesReturnType {
    return this.get('/cases', { params });
  }

  getPatientCases({ patientRef, ...params }: GetPatientCasesParams): GetPatientCasesReturnType {
    return this.get(`/patient/${patientRef}/cases`, { params });
  }

  getCaseDetails(id: string, params: GetCaseParams): GetCaseReturnType {
    return this.get(`/case/${id}`, { params });
  }

  createEmptyCase(params: Partial<BlankCaseBody>): Promise<ApiResponse<BlankCaseResponse>> {
    return this.post('/case', { ...params });
  }

  dischargeCase(ref: string, params: Partial<BlankCaseBody>): Promise<ApiResponse<any>> {
    const { country, businessRef } = params;
    return this.put(`/case/${ref}/discharge?country=${country}&businessRef=${businessRef}`, { ...params });
  }
}

export default CaseApiService;
