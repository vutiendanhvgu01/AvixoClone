import PractitionerApiService from 'modules/practitioner/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const practitionerApiService = new PractitionerApiService({}, { req, res });
  const practitionerId = req.query.practitionerId as string;
  return forwardRequest(req, res, practitionerApiService.getPatientPractitioner(practitionerId));
}
