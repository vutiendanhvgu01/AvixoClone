import CaseApiService from 'modules/cases/services';
import { GetCaseParams } from 'modules/cases/services/shared';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(403).send({ message: 'Not Authorized' });
  }

  if (req.method === 'GET') {
    const caseApiService = new CaseApiService();
    const params: GetCaseParams = {
      businessRef: req.query.businessRef as string,
      country: req.query.country as string,
    };

    return forwardRequest(req, res, caseApiService.getCaseDetails(req.query.caseRef as string, params));
  }

  return res.status(404).send('Not Found');
}
