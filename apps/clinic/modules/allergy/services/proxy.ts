import ApiService from 'common/api';
import { ApiResponse } from 'share-components';

class AllergyProxyService extends ApiService {
  getDrugNames(params: { search: string }): Promise<ApiResponse> {
    return this.get('/cmis/list/medication', { params });
  }

  getDrugBrands(params: { search: string }): Promise<ApiResponse> {
    return this.get('/cmis/list/brand', { params });
  }
}

const allergyProxyService = new AllergyProxyService({ baseURL: '/api' });

export default allergyProxyService;
