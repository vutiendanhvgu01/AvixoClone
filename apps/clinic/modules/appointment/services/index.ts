import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { APPOINTMENT_API_URL } from '../constants';

class AppointmentApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: APPOINTMENT_API_URL }, context);
  }

  getPatientAppointments(params?: Record<string, any>): Promise<ApiResponse> {
    return this.get('/appointment', { params });
  }

  getAppointment(id?: string | number): Promise<ApiResponse> {
    return this.get(`/appointment/${id}`);
  }

  createAppointment(data: any): Promise<ApiResponse> {
    return this.post(`/appointment`, data);
  }

  deleteAppointment(id: string | number): Promise<ApiResponse> {
    return this.delete(`/appointment/${id}`);
  }

  updateAppointment(id: string | number, data: any): Promise<ApiResponse> {
    return this.put(`/appointment/${id}`, data);
  }
}

export default AppointmentApiService;
