import PatientApiService from 'modules/patient/api/patient-api';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest, getCookieValue } from 'share-components';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(403).send({ message: 'Not Authorized' });
  }

  if (req.method === 'GET') {
    const organizationRef = getCookieValue('organizationRef', { req, res }) as string;
    const patientApiService = new PatientApiService();
    return forwardRequest(req, res, patientApiService.getPatientCount({ organizationRef }));
  }

  return res.status(404).send('Not Found');
}
