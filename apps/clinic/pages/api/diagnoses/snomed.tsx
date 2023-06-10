import DiagnosisApiService from 'modules/diagnosis/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const diagnosisApiService = new DiagnosisApiService({}, { req, res });
  return forwardRequest(req, res, diagnosisApiService.getDiagnosesSnomedList(req.query));
}
