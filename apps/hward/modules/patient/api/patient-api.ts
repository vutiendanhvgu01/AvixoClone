import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { PatientFormValues } from '../components/patient-types';
import {
  GetPatientCountParams,
  GetPatientCountReturnType,
  GetPatientsParams,
  GetPatientsReturnType,
  GetPatientParams,
  GetPatientReturnType,
  PatientResponse,
} from './patient-api-type';

const { publicRuntimeConfig } = getConfig();
const USMS_API_URL = `${publicRuntimeConfig.USMS_API_URL}/hward`;
const USMS_API_KEY = `${publicRuntimeConfig.USMS_API_KEY}`;

class PatientApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: USMS_API_URL, headers: { 'x-api-key': USMS_API_KEY } }, context);
  }

  createPatient(params: Partial<PatientFormValues>): Promise<ApiResponse<PatientResponse>> {
    return this.post('/patient', { ...params });
  }

  getPatients(params: GetPatientsParams): GetPatientsReturnType {
    return this.get('/patients', { params });
  }

  getPatient(params: GetPatientParams): GetPatientReturnType {
    return this.get('/patient', { params });
  }

  getPatientCount(params: GetPatientCountParams): GetPatientCountReturnType {
    return this.get('/patients/count', { params });
  }
}

export default PatientApiService;
