import ApiService from 'common/api';
import {
  GetPatientCountParams,
  GetPatientCountReturnType,
  GetPatientsParams,
  GetPatientsReturnType,
  GetPatientParams,
  GetPatientReturnType,
} from './patient-api-type';

class PatientProxyService extends ApiService {
  getPatients(params: GetPatientsParams): GetPatientsReturnType {
    return this.get(`/patients`, { params });
  }

  getPatientCount(params: GetPatientCountParams): GetPatientCountReturnType {
    return this.get(`/patients/count`, { params });
  }

  getPatient(params: GetPatientParams): GetPatientReturnType {
    return this.get(`/patient`, { params });
  }
}

const patientProxyService = new PatientProxyService({ baseURL: '/api' });

export default patientProxyService;
