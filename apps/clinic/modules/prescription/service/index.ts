import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { PRESCRIPTION_MS_URL } from '../constants';
import { Prescription } from '../types/prescription';

class PrescriptionApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: PRESCRIPTION_MS_URL }, context);
  }

  getPrescriptions(params?: Record<string, any>): Promise<ApiResponse> {
    return this.get('/prescription', {
      params,
    });
  }

  getPrescriptionDetail(uuid: string | number, type?: 'id' | 'uuid'): Promise<ApiResponse<Prescription>> {
    if (type === 'id') {
      return this.get(`/prescription/${uuid}`);
    }
    return this.get(`/prescription/uuid/${uuid}`);
  }

  getPrescriptionItemDetail(
    prescriptionId: string | number,
    itemId: string | number,
  ): Promise<ApiResponse<Prescription>> {
    return this.get(`/prescription/${prescriptionId}/item/${itemId}`);
  }

  finalisePrescription(id: string | number): Promise<ApiResponse<Prescription>> {
    return this.put(`/prescription/${id}/finalise`, {});
  }

  createPrescriptionItem(
    prescriptionId: string | number,
    data: Record<string, any>,
  ): Promise<ApiResponse<Prescription>> {
    return this.post(`/prescription/${prescriptionId}/item`, data);
  }

  createPrescription(data: Record<string, any>): Promise<ApiResponse<Prescription>> {
    return this.post(`/prescription`, data);
  }

  deletePrescription(prescriptionId: string | number): Promise<ApiResponse<string>> {
    return this.delete(`/prescription/${prescriptionId}`);
  }

  deleteItemPrescription(prescriptionId: string | number, id: string | number): Promise<ApiResponse<Prescription>> {
    return this.delete(`/prescription/${prescriptionId}/item/${id}`);
  }

  updatePrescriptionItem(
    prescriptionId: string | number,
    id: string | number,
    data: Record<string, any>,
  ): Promise<ApiResponse<Prescription>> {
    return this.put(`/prescription/${prescriptionId}/item/${id}`, data);
  }

  updateInstruction(
    prescriptionId: string | number,
    itemId: string | number,
    id: string | number,
    data: Record<string, any>,
  ): Promise<ApiResponse<Prescription>> {
    return this.put(`/prescription/${prescriptionId}/item/${itemId}/instruction/${id}`, data);
  }

  deleteInstruction(
    prescriptionId: string | number,
    itemId: string | number,
    id: string | number,
  ): Promise<ApiResponse<Prescription>> {
    return this.delete(`/prescription/${prescriptionId}/item/${itemId}/instruction/${id}`);
  }
}

export default PrescriptionApiService;
