import PatientApiService from 'modules/patient/api/patient-api';
import { GetPatientParams } from 'modules/patient/api/patient-api-type';
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
    const params = {
      organizationRef,
    } as Record<string, string>;
    if (req.query.patientUsmsRef) params.patientUsmsRef = req.query.patientUsmsRef as string;
    if (req.query.patientJarvisRef) params.patientJarvisRef = req.query.patientJarvisRef as string;

    return forwardRequest(req, res, patientApiService.getPatient(params as GetPatientParams));
  }

  return res.status(404).send('Not Found');
}
