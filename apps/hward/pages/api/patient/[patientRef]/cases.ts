import CaseApiService from 'modules/cases/services';
import { GetPatientCasesParams } from 'modules/cases/services/shared';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest, getCookieValue } from 'share-components';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(403).send({ message: 'Not Authorized' });
  }

  if (req.method === 'GET') {
    const businessRef = getCookieValue('businessRef', { req, res }) as string;
    const patientRef = req.query.patientRef as string;
    const caseApiService = new CaseApiService();
    const params: GetPatientCasesParams = {
      country: 'SG',
      businessRef,
      patientRef,
    };
    return forwardRequest(req, res, caseApiService.getPatientCases(params));
  }

  return res.status(404).send('Not Found');
}
