import getConfig from 'next/config';
import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { FormattedFinalBody } from '../utils/formatBody';
import {
  AppointmentResponse,
  AppointmentsRequest,
  AppointmentsResponse,
  EditAppointmentRequest,
} from './appointment-api-type';

const { publicRuntimeConfig } = getConfig();
const USMS_API_URL = `${publicRuntimeConfig.BOOKING_SERVICE_URL}/v1/hward`;
const USMS_API_KEY = `${publicRuntimeConfig.BOOKING_SERVICE_API_KEY}`;

class AppointmentApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: USMS_API_URL, headers: { 'x-api-key': USMS_API_KEY } }, context);
  }

  createDraftService(params: FormattedFinalBody): Promise<ApiResponse<AppointmentResponse>> {
    return this.post('/service', { ...params });
  }

  getServices(params: AppointmentsRequest): Promise<ApiResponse<AppointmentsResponse>> {
    return this.get('/services', { params });
  }

  editAppointment(params: EditAppointmentRequest): Promise<ApiResponse<AppointmentResponse>> {
    return this.put('/service', { ...params });
  }
}

export default AppointmentApiService;
