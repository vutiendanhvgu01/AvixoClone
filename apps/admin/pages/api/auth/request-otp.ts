import AuthApiService from 'modules/auth/api/auth-api';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';
import { HTTP_METHOD } from 'share-components/src/constants/httpMethod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HTTP_METHOD.POST) {
    const { sessionId, method } = req.body;
    const authLoginService = new AuthApiService();
    return forwardRequest(req, res, authLoginService.requestOtp(sessionId, method));
  }
  return res.status(405);
}
