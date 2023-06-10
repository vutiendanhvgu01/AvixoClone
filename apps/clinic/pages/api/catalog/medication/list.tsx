import { NextApiRequest, NextApiResponse } from 'next';
import CatalogApiService from 'modules/catalog/service';
import { forwardRequest } from 'share-components/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const catalogApiService = new CatalogApiService({}, { res, req });
  return forwardRequest(req, res, catalogApiService.getListItem(req.query));
}
