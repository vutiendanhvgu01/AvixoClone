import ApiService from 'common/api';
import { ApiResponse } from 'share-components';

class CatalogProxyService extends ApiService {
  getListItem(params?: Record<string, any>): Promise<ApiResponse<any>> {
    return this.get('/catalog/medication/list', { params });
  }
}

export default new CatalogProxyService({ baseURL: '/api' });
