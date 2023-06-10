import { getAvixoId, isLoggedIn } from 'common/utils/cookies';
import VitalApiService from 'modules/vitals/api/vital-api';
import { VitalFormPayload } from 'modules/vitals/components/vital-form-schema';
import formatBody from 'modules/vitals/utils/formatBody';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!isLoggedIn({ req, res })) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const patientId = getAvixoId({ req, res }) as unknown as string;
      const body: VitalFormPayload = { ...formatBody(req.body), patient_id: Number.parseInt(patientId, 10) };
      const vitalApiService = new VitalApiService();
      const params: Parameters<typeof vitalApiService.addVitals>[1] = { country: 'SG' };
      const isDev = req.headers.host?.includes('dev');
      if (process.env.NODE_ENV === 'development' || isDev || process.env.E2E_TEST) {
        params.env = 'DEV';
      } else if (process.env.NODE_ENV === 'production' && !isDev) {
        params.env = 'PRODUCTION';
      }
      const { data } = await vitalApiService.addVitals(body, params);

      if (data.message === 'Vitals Recorded successfully.') {
        return res.status(200).send(data);
      }
    } catch (error: any) {
      return res.status(400).send({ message: 'Bad request' });
    }
  }

  return res.status(405).send({ message: 'Not found' });
}
