import PatientApiService from 'modules/patient/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const patientApiService = new PatientApiService({}, { req, res });
  return forwardRequest(req, res, patientApiService.getPatients());
}
