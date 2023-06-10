import { ApiRequest } from 'share-components';
import { GetStatsParams, GetStatsReturnType } from './dashboard-api-type';

class DashboardProxyService extends ApiRequest {
  getStats(params: GetStatsParams): GetStatsReturnType {
    return this.get('/stats', { params });
  }
}

const dashboardProxyService = new DashboardProxyService({ baseURL: '/api' });

export default dashboardProxyService;
