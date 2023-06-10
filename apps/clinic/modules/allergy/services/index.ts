import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { Allergy } from '../components/allergy-types';
import { ALLERGY_API_URL } from '../constants';
import { DrugBrand, DrugName } from '../types/drug';

class AllergyApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: ALLERGY_API_URL }, context);
  }

  getPatientAllergies(patientId: number): Promise<ApiResponse<Allergy[]>> {
    return this.get('/allergy', { params: { patientId } });
  }

  createAllergy(data: any): Promise<ApiResponse> {
    return this.post(`/allergy`, data);
  }

  updateAllergy(allergyId: number | string, data: any): Promise<ApiResponse> {
    return this.put(`/allergy/${allergyId}`, data);
  }

  deleteAllergy(allergyId: number | string): Promise<ApiResponse> {
    return this.delete(`/allergy/${allergyId}`);
  }

  getDrugNames(params: { search?: string }): Promise<ApiResponse<DrugName[]>> {
    return this.get('/cmis/list/medication', { params });
  }

  getDrugBrands(params: { search?: string }): Promise<ApiResponse<DrugBrand[]>> {
    return this.get('/cmis/list/brand', { params });
  }
}

export default AllergyApiService;
