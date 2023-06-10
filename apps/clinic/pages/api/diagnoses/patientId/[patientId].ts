import DiagnosisApiService from 'modules/diagnosis/services';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { patientId } = req.query;
  const diagnosisApiService = new DiagnosisApiService();

  return forwardRequest(req, res, diagnosisApiService.getDiagnosesByPatient(String(patientId)));
}
