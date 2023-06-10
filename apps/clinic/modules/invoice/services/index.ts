import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { INVOICE_MS_URL } from '../constants';
import type { Invoice } from '../types/invoice';

class InvoiceApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: INVOICE_MS_URL }, context);
  }

  getInvoices(params?: Record<string, any>): Promise<ApiResponse<Invoice[]>> {
    return this.get('/invoice', { params });
  }

  getInvoiceDetails(uuid: string | number, type?: 'id' | 'uuid'): Promise<ApiResponse<Invoice>> {
    if (type === 'id') {
      return this.get(`/patient/${uuid}`);
    }
    return this.get(`/patient/uuid/${uuid}`);
  }

  getPatientInvoices(params: { patientId: number | string }): Promise<ApiResponse<Invoice>> {
    return this.get('/invoice', { params });
  }

  deletePatientInvoice(id: number): Promise<ApiResponse<Invoice>> {
    return this.delete(`/invoice/${id}`);
  }

  deletePatientInvoiceByUuid(uuid: string): Promise<ApiResponse<Invoice>> {
    return this.delete(`/invoice/uuid/${uuid}`);
  }

  createNewPatientInvoice(data: any): Promise<ApiResponse<Invoice>> {
    return this.post(`/invoice`, data);
  }

  createPatientInvoiceItem(invoiceId: number | string, data: any): Promise<ApiResponse> {
    return this.post(`/invoice/${invoiceId}/item`, data);
  }

  getPatientInvoiceByUUID(uuid: string | string[]): Promise<ApiResponse> {
    return this.get(`/invoice/uuid/${uuid}`);
  }
}

export default InvoiceApiService;
