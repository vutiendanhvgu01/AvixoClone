import { AddressFull } from 'common/constants/types';
import AppointmentApiService from 'modules/appointment/api/appointment-api';
import { AppointmentFormValues } from 'modules/appointment/components/appointment-types';
import type { ServiceUnion } from 'modules/appointment/constants';
import formatBody, { FormattedFinalBody } from 'modules/appointment/utils/formatBody';
import CaseApiService from 'modules/cases/services';
import PatientApiService from 'modules/patient/api/patient-api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookieValue } from 'share-components';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(403).send({ message: 'Not Authorized' });
  }

  if (req.method === 'POST') {
    try {
      const patientApiService = new PatientApiService();
      const appointmentApiService = new AppointmentApiService();
      const businessRef = getCookieValue('businessRef', { req, res }) as string;
      const organizationRef = getCookieValue('organizationRef', { req, res }) as string;
      // Step 1: Get Patient Location (This might be temporary)
      const { data: patient } = await patientApiService.getPatient({
        organizationRef,
        patientJarvisRef: req.body.patientRef as string,
      });
      // Step 2: Format body for MS
      const address = patient?.patient?.contacts?.addresses?.[0] as AddressFull | undefined;
      const appointments = req.body.appointments.map((app: AppointmentFormValues['appointments'][number]) => {
        const formatted = formatBody({
          startDate: app.startDate,
          startTime: app.startTime,
          orderRequest: app.orderRequest,
          additionalComments: app.additionalComments,
          service: req.body.service as ServiceUnion,
          businessRef,
          caseRef: req.query.caseRef as string,
          patientRef: req.body.patientRef as string,
        });
        const addressFilled =
          address &&
          address.fullAddress?.length > 0 &&
          address.city?.length > 0 &&
          address.postalCode?.length > 0 &&
          Object.keys(address.coordinates).length > 0;
        if (addressFilled) {
          const addressDetails = {
            alpha2: 'SG',
            line1: address.fullAddress,
            title: address.fullAddress?.split(',')[0] ?? 'Title',
            unit: address.unit,
            city: address.city,
            postCode: address.postalCode,
            coordinates: address.coordinates,
          };
          if (formatted.type === 'Delivery' && formatted.specialty === 'Rider') {
            formatted.destinationAddress = addressDetails;
          } else {
            formatted.requestedAddress = addressDetails;
          }
        }
        return formatted;
      }) as FormattedFinalBody[];
      // Step 3: Call POST Create Draft Service API
      // eslint-disable-next-line no-restricted-syntax
      for await (const appt of appointments) {
        await appointmentApiService.createDraftService(appt);
      }

      // Step 4: Return OK
      return res.status(200).send({ message: 'Appointment successfully created', status: 200 });
    } catch (error: any) {
      return res.status(400).send({
        message: error?.originResponse?.response?.data,
        status: error?.originResponse?.response?.status,
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      const caseApiService = new CaseApiService();
      const businessRef = getCookieValue('businessRef', { req, res }) as string;
      await caseApiService.dischargeCase(req.query.caseRef as string, {
        country: 'SG',
        businessRef,
      });
      const { data } = await caseApiService.getCaseDetails(req.query.caseRef as string, {
        country: 'SG',
        businessRef,
      });
      return res.status(200).send(data);
    } catch (error: any) {
      return res.status(400).send({
        message: error?.message,
      });
    }
  }
  return res.status(404).send({});
}
