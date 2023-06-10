import PractitionerApiService from 'modules/practitioner/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const practitionerApiService = new PractitionerApiService({}, { req, res });
  const premiseId = req.query.premiseId as string;
  return forwardRequest(req, res, practitionerApiService.getPractitionersList({ premiseId }));
}
