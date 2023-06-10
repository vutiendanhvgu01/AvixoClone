import { BlankCaseBody } from 'modules/cases/api/case-api-type';
import CaseApiService from 'modules/cases/services';
import PatientApiService from 'modules/patient/api/patient-api';
import {
  CreatePatientResponse,
  GetPatientsParams,
  HWardAccount,
  JarvisAccount,
  Organization,
  SpeedocPatientAccount,
} from 'modules/patient/api/patient-api-type';
import censorNRIC from 'modules/patient/utils/censorNRIC';
import formatBody from 'modules/patient/utils/formatBody';
import type { NextApiRequest, NextApiResponse } from 'next';
import { forwardRequest, getCookieValue } from 'share-components/src';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(403).send({ message: 'Not Authorized' });
  }

  if (req.method === 'POST') {
    const ctx = { req, res };
    const initialBody = formatBody(req.body);

    const patientApiService = new PatientApiService();
    const caseApiService = new CaseApiService();
    try {
      // Step 1: Retrieve businessRef from Cookie
      const organizationRef = getCookieValue('organizationRef', ctx);
      // Step 2: Attach organizationRef to body
      const body = {
        ...initialBody,
        organizationRef,
      } as typeof initialBody & { organizationRef: string };
      // Step 3: Create Patient by hitting USMS API POST /hward/patient endpoint
      const { data: patient } = await patientApiService.createPatient(body);
      // Step 4: Create Case
      // Step 4a. Find HWard account
      const hwardAccount = patient.patient.accounts.find(acc => acc.type === 'hward') as HWardAccount;
      // Step 4b. Find Jarvis account (within HWard acc) to get businessRef
      const hwardOrganization = hwardAccount.organizationRef as Organization;
      const jarvisBusinessAccount = hwardOrganization.accounts.find(acc => acc.type === 'jarvis') as JarvisAccount;
      // Step 4c. Find Speedoc Patient account (within HWard acc) to get patientRef
      const speedocPatientAccount = patient.patient.accounts.find(
        acc => acc.type === 'speedoc-patient',
      ) as SpeedocPatientAccount;
      // Step 4d. Construct case body
      const caseBody: BlankCaseBody = {
        country: 'SG',
        businessRef: jarvisBusinessAccount.id,
        patientRef: speedocPatientAccount.id,
      };
      // Step 4e. Create blank case
      try {
        const { data: blankCase } = await caseApiService.createEmptyCase(caseBody);
        // Step 5. Transform the result for FE
        const result: CreatePatientResponse = {
          fullName: patient.patient.profile.fullName,
          caseId: `C-${blankCase.id}`,
          nric: censorNRIC(body.nric),
          status: 200,
        };
        return res.status(200).send(result);
      } catch (caseError: any) {
        return res.status(400).send({
          message: caseError?.originError?.response?.data,
          status: caseError?.originError?.response?.status,
          cause: 'case',
          // eslint-disable-next-line no-underscore-dangle
          patientId: patient.patient._id,
        });
      }
    } catch (error: any) {
      return res.status(400).send({
        message: error?.originError?.response?.data,
        status: error?.originError?.response?.status,
      });
    }
  } else if (req.method === 'GET') {
    const organizationRef = getCookieValue('organizationRef', { req, res }) as string;
    const patientApiService = new PatientApiService();
    const params = {
      organizationRef,
    } as GetPatientsParams;

    if (req.query?.page) params.page = parseInt(req.query.page as string, 10);
    if (req.query?.perPage) params.perPage = parseInt(req.query.perPage as string, 10);
    if (req.query?.search) params.search = req.query.search as string;

    return forwardRequest(req, res, patientApiService.getPatients(params));
  }

  return res.status(404).send({});
}
