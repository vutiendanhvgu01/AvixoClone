import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { INVENTORY_MS_URL } from '../../constants';

class InventoryApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: INVENTORY_MS_URL }, context);
  }

  getItemInventory(id: string | number): Promise<ApiResponse<any>> {
    return this.get(`/item/${id}`);
  }
}

export default InventoryApiService;
