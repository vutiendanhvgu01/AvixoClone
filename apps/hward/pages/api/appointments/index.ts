import { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest, getCookieValue } from 'share-components';
import AppointmentApiService from 'modules/appointment/api/appointment-api';
import { AppointmentsRequest } from 'modules/appointment/api/appointment-api-type';

export default async function handlers(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.access_token;
  const businessRef = getCookieValue('businessRef', { req, res });
  const appointmentService = new AppointmentApiService();
  if (!token) {
    return res.status(403).send({ message: 'Not Authorized' });
  }

  if (req.method === 'GET') {
    const params = {
      businessRef,
      country: 'SG',
      search: req.query?.search as string,
    } as AppointmentsRequest;

    if (req.query?.page) params.page = parseInt(req.query.page as string, 10);
    if (req.query?.perPage) params.perPage = parseInt(req.query.perPage as string, 10);

    return forwardRequest(req, res, appointmentService.getServices(params));
  }

  if (req.method === 'PUT') {
    const params = {
      ...req.body,
      businessRef,
    };

    return forwardRequest(req, res, appointmentService.editAppointment(params));
  }

  return res.status(404).send({});
}
