import { NextApiRequest, NextApiResponse } from 'next';
import AuthApiService from 'modules/auth/api/auth-api';
import { forwardRequest } from 'share-components/src';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authLoginService = new AuthApiService({ req, res });
  return forwardRequest(req, res, authLoginService.getRoles());
}
