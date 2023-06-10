import { BASE_URL } from 'common/constants/urls';
import { GetServerSidePropsContext } from 'next';
import { ApiRequest, CreateAxiosDefaults, getToken } from 'share-components';

class ApiService extends ApiRequest {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    const configApi: CreateAxiosDefaults = config || { baseURL: BASE_URL };
    if (context) {
      // eslint-disable-next-line no-param-reassign
      configApi.headers = { Authorization: `Bearer ${getToken(context)}` };
    }
    super(configApi, context);
  }
}

export default ApiService;
