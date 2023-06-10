import ReferralApiService from 'modules/medical-record/services/referral';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest } from 'share-components/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const referralApiService = new ReferralApiService({}, { req, res });
  return forwardRequest(req, res, referralApiService.getReferralDestination());
}
