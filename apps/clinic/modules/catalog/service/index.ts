import ApiService from 'common/api';
import { GetServerSidePropsContext } from 'next';
import { ApiResponse, CreateAxiosDefaults } from 'share-components';
import { CATALOG_MS_URL } from 'modules/catalog/constants';
import { Catalog } from 'modules/catalog/types';

class CatalogApiService extends ApiService {
  constructor(config?: CreateAxiosDefaults, context?: Partial<GetServerSidePropsContext>) {
    super({ ...config, baseURL: CATALOG_MS_URL }, context);
  }

  getListItem(params?: Record<string, any>): Promise<ApiResponse<Catalog[]>> {
    return this.get('/item/list', { ...params });
  }

  getListProducts(): Promise<ApiResponse<Catalog[]>> {
    return this.get('/item/list?type=vaccination');
  }

  getItems(): Promise<ApiResponse<Catalog[]>> {
    return this.get('/item/list');
  }
}

export default CatalogApiService;
