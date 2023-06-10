import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { VISIT_MS_URL } from '../constants';

class VisitApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: VISIT_MS_URL }, context);
  }

  getList(): Promise<ApiResponse> {
    return this.get('/visit');
  }
}

export default VisitApiService;
