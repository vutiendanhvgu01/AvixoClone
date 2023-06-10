import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components';
import { HTTP_METHOD } from 'share-components/src/constants/httpMethod';
import UserApiService from 'modules/user/api/user-api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HTTP_METHOD.POST) {
    const userApi = new UserApiService();
    return forwardRequest(req, res, userApi.requestOtp(req.body));
  }
  return res.status(405);
}
