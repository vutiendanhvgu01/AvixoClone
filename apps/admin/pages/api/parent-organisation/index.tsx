import OrganisationApiService from 'modules/organisation/services';
import { forwardRequest } from 'share-components/src';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const organizationService = new OrganisationApiService({});
  return forwardRequest(req, res, organizationService.getOrganizations({ isParent: true }));
}
