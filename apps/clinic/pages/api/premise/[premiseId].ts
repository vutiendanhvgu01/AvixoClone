import OrganisationApiService from 'modules/organisation/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const organisationApiService = new OrganisationApiService({}, { req, res });
  return forwardRequest(req, res, organisationApiService.getPremiseDetails(req.query?.premiseId as string));
}
