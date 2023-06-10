import { NextApiRequest, NextApiResponse } from 'next';
import { setAvixoId } from 'common/utils/cookies';
import { ApiError } from 'share-components';
import UserApiService from 'modules/user/api/user-api';
import { HTTP_METHOD } from 'share-components/src/constants/httpMethod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === HTTP_METHOD.POST) {
    try {
      const userApi = new UserApiService();
      const { data } = await userApi.verifyOtp(req.body);
      setAvixoId(data.pcno, { req, res });
      res.status(200).json(data);
    } catch (error: any) {
      const { originError } = error as ApiError;
      res?.status(originError?.status ?? 500).json(originError?.response?.data);
    }
  }
  return res.status(405);
}
