import { ApiResponse } from 'share-components';
import ApiService from '../../services/ApiRequest/api-request';

class AutoCompleteApiService extends ApiService {
  getData(url: string, params?: Record<string, any>): Promise<ApiResponse<any>> {
    return this.get(url, params);
  }
}

export default AutoCompleteApiService;
