import ApiService from 'common/api';
import { MEDICAL_RECORD_MS_URL } from 'modules/medical-record/constants';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import startOfMonth from 'date-fns/startOfMonth';
import { CarePlan } from '../../types/care-plan';

class CarePlanApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: MEDICAL_RECORD_MS_URL }, context);
  }

  getCarePlans(): Promise<ApiResponse<CarePlan[]>> {
    return this.get('/careplan');
  }

  getCarePlan(uuid: string | number, type?: 'id' | 'uuid'): Promise<ApiResponse<CarePlan>> {
    if (type === 'id') {
      return this.get(`/careplan/${uuid}`);
    }
    return this.get(`/careplan/uuid/${uuid}`);
  }

  createCarePlan<T = Record<string, any>>(data: any): Promise<ApiResponse<T>> {
    return this.post('/careplan', data);
  }

  updateCarePlan(uuid: string, data: any): Promise<ApiResponse<any>> {
    return this.put(`/careplan/uuid/${uuid}`, data);
  }

  createCarePlanGoal(carePlanId: string | number, data: any): Promise<ApiResponse<string>> {
    return this.post('/goal', {
      careplanId: typeof carePlanId === 'number' ? carePlanId : parseInt(carePlanId, 10),
      ...data,
    });
  }

  deleteCarePlanGoal(id: string | number): Promise<ApiResponse<string>> {
    return this.delete(`/goal/${id}`);
  }
}

export const formatCarePlanFormData = (body: any) => {
  const { intent = 'plan', confirmation, generalNotes, month, year, id, patientId } = body;

  const carePlan: Record<string, any> = {
    status: confirmation === 'true' ? 'active' : 'draft',
    patientId: parseInt(patientId, 10),
    intent,
  };

  if (month && year && generalNotes) {
    carePlan.activities = [
      {
        scheduledStart: startOfMonth(new Date(parseInt(year, 10), parseInt(month, 10) - 1)).toISOString(),
        generalNotes,
      },
    ];
  }

  if (id) {
    carePlan.id = parseInt(id, 10);
  }

  return carePlan;
};

export default CarePlanApiService;
