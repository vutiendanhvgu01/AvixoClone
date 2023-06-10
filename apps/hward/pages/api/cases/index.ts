import { NextApiRequest, NextApiResponse } from 'next';
import CaseApiService from 'modules/cases/services';
import { forwardRequest, getCookieValue } from 'share-components/src';
import { GetCasesParams } from 'modules/cases/services/shared';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(403).send({ message: 'Not Authorized' });
  }

  const businessRef = getCookieValue('businessRef', { req, res }) as string;
  const params = {
    country: 'SG',
    businessRef,
  } as GetCasesParams;

  if (req.query.page) params.page = parseInt(req.query.page as string, 10);
  if (req.query.perPage) params.perPage = parseInt(req.query.perPage as string, 10);
  if (req.query.search) params.search = (req.query.search as string).toUpperCase();

  return forwardRequest(req, res, new CaseApiService().getCases(params));
}
