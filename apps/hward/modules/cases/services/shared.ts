import { ApiResponse } from 'share-components';
import { CasesResponse, PatientCasesResponse, CaseResponse } from '../api/case-type';

type GetCasesParams = {
  country: string;
  businessRef: string;
  search?: string;
  page?: number;
  perPage?: number;
};
type GetCasesReturnType = Promise<ApiResponse<CasesResponse>>;

type GetPatientCasesParams = {
  country: string;
  businessRef: string;
  patientRef: string;
};

type GetPatientCasesReturnType = Promise<ApiResponse<PatientCasesResponse[]>>;

type GetCaseParams = {
  country: string;
  businessRef: string;
};

type GetCaseReturnType = Promise<ApiResponse<CaseResponse>>;

export {
  type GetCasesParams,
  type GetCasesReturnType,
  type GetPatientCasesParams,
  type GetPatientCasesReturnType,
  type GetCaseParams,
  type GetCaseReturnType,
};
