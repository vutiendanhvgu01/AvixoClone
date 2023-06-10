import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { ImmunisationFormValues, Immunisation } from '../components/immunisation-types';
import { IMMUNISATION_API_URL } from '../constants';

interface MessageResponse {
  message?: string;
}

class ImmunisationApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: IMMUNISATION_API_URL }, context);
  }

  getPatientImmunisation(params: { patientId: number | string }): Promise<ApiResponse<Immunisation[]>> {
    return this.get('/immunisation', { params });
  }

  createNewPatientImmunisation(data: ImmunisationFormValues | any): Promise<ApiResponse<Immunisation>> {
    return this.post(`/immunisation`, data);
  }

  updatePatientImmunisation(
    immunisationId: number | string | string[] | undefined,
    data: ImmunisationFormValues,
  ): Promise<ApiResponse<MessageResponse>> {
    return this.put(`/immunisation/${immunisationId}`, data);
  }

  deletePatientImmunisation(
    immunisationId: number | string | string[] | undefined,
  ): Promise<ApiResponse<MessageResponse>> {
    return this.delete(`/immunisation/${immunisationId}`);
  }
}

export default ImmunisationApiService;
