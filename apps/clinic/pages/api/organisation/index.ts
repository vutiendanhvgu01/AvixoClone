import { NextApiRequest, NextApiResponse } from 'next';
import OrganisationApiService from 'modules/organisation/services';
import { forwardRequest } from 'share-components/src';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return forwardRequest(req, res, new OrganisationApiService({}, { req, res }).getOrganizations());
}
