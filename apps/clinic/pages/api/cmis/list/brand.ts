import AllergyApiService from 'modules/allergy/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allergyApiService = new AllergyApiService({}, { req, res });
  const search = req.query.search?.toString() ?? '';
  return forwardRequest(req, res, allergyApiService.getDrugBrands({ search }));
}
