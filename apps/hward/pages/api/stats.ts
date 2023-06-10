import DashboardApiService from 'modules/Dashboard/api/dashboard-api';
import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest, getCookieValue } from 'share-components';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(403).send({ message: 'Not Authorized' });
  }

  if (req.method === 'GET') {
    const businessRef = getCookieValue('businessRef', { req, res }) as string;
    const dashboardApiService = new DashboardApiService();
    return forwardRequest(req, res, dashboardApiService.getStats({ country: 'SG', businessRef }));
  }

  return res.status(404).send('Not Found');
}
