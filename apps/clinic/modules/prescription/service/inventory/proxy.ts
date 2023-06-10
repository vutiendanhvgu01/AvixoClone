import ApiService from 'common/api';
import { ApiResponse } from 'share-components';

class InventoryProxyService extends ApiService {
  getItemInventory(id: string | number): Promise<ApiResponse<any>> {
    return this.get(`/inventory/${id}`);
  }
}
export default new InventoryProxyService({ baseURL: '/api' });
