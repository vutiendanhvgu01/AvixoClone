import ApiService from 'common/api';
import { GenericResponse } from 'common/constants/types';
import { ApiResponse } from 'share-components';
import {
  AppointmentsRequest,
  AppointmentsResponse,
  EditAppointmentRequest,
} from 'modules/appointment/api/appointment-api-type';
import { AppointmentFormValues } from '../components/appointment-types';

class AppointmentProxyService extends ApiService {
  createDraftService(caseRef: string, params: AppointmentFormValues): Promise<ApiResponse<GenericResponse>> {
    return this.post(`/cases/${caseRef}/appointments`, { ...params });
  }

  getServices(params: AppointmentsRequest): Promise<ApiResponse<AppointmentsResponse>> {
    return this.get('/appointments', { params });
  }

  editAppointment(params: Omit<EditAppointmentRequest, 'businessRef'>): Promise<ApiResponse<GenericResponse>> {
    return this.put('/appointments', { ...params });
  }
}

const appointmentProxyService = new AppointmentProxyService({ baseURL: '/api' });

export default appointmentProxyService;
