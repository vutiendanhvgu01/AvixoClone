import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { DISPENSE_MS_URL } from '../constants';
import { Dispense } from '../types/dispense';

class DispenseApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: DISPENSE_MS_URL }, context);
  }

  createDispense(data: any): Promise<ApiResponse> {
    return this.post('/dispense', data);
  }

  finaliseDispense(id: string | number): Promise<ApiResponse<string>> {
    return this.put(`/dispense/${id}/finalise`, {});
  }

  getDispenseList(params?: Record<string, any>): Promise<ApiResponse<Dispense[]>> {
    return this.get('/dispense', { params });
  }

  getDispenseListByTypeId(
    type: 'patientId' | 'prescriptionId',
    typeId: string | number,
  ): Promise<ApiResponse<Dispense[]>> {
    return this.get(`/dispense?${type}=${typeId}`);
  }

  getDispenseItems(id: number): Promise<ApiResponse> {
    return this.get(`/dispense/${id}/item`);
  }

  createDispenseItem(id: string | number, data: any): Promise<ApiResponse> {
    return this.post(`dispense/${id}/item`, data);
  }

  updateDispenseItem(id: number, itemId: number, data: any): Promise<ApiResponse> {
    return this.put(`/dispense/${id}/item/${itemId}`, data);
  }

  deleteDispenseItem(id: number, itemId: number): Promise<ApiResponse> {
    return this.delete(`/dispense/${id}/item/${itemId}`);
  }

  getDispenseDetail(uuid: string | number, type?: 'id' | 'uuid'): Promise<ApiResponse<Dispense>> {
    if (type === 'id') {
      return this.get(`/dispense/${uuid}`);
    }
    return this.get(`/dispense/uuid/${uuid}`);
  }

  updateInstruction(
    dispenseId: string | number,
    itemId: string | number,
    id: string | number,
    data: Record<string, any>,
  ): Promise<ApiResponse<Dispense>> {
    return this.put(`/dispense/${dispenseId}/item/${itemId}/instruction/${id}`, data);
  }

  deleteInstruction(
    dispenseId: string | number,
    itemId: string | number,
    id: string | number,
  ): Promise<ApiResponse<Dispense>> {
    return this.delete(`/dispense/${dispenseId}/item/${itemId}/instruction/${id}`);
  }

  deleteDispense(dispenseId: string | number): Promise<ApiResponse<string>> {
    return this.delete(`/dispense/${dispenseId}`);
  }
}

export default DispenseApiService;
