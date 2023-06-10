import NEHRConnectorApiService from 'modules/nehr-connector/services';
import { PATIENT_MS_URL } from 'modules/patient/constants';
import PatientApiService from 'modules/patient/services';
import { PrescriptionValues } from 'modules/prescription/components/PrescriptionForm/types';
import PrescriptionApiService from 'modules/prescription/service';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { parsePayloadFieldsToInteger } from 'share-components';
import { responseSuccess } from 'share-components/src/utils/apiUtils';

const patientManagementPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action: bodyAction, ...restBody } = body;
  const action = ctx.query?.action || bodyAction;
  const prescriptionService = new PrescriptionApiService({}, ctx);
  const patientService = new PatientApiService({ baseURL: PATIENT_MS_URL }, ctx);

  try {
    switch (action) {
      case 'add-patient': {
        const parsedContact = JSON.parse(body.contact);
        parsedContact.forEach((item: any, index: number) => {
          if (!item.validTo || !item.validFrom) {
            delete parsedContact[index].validFrom;
            delete parsedContact[index].validTo;
          }
        });
        const payload = {
          ...restBody,
          birthDate: new Date(body.birthDate).toISOString(),
          identities: JSON.parse(body.identities),
          phones: JSON.parse(body.phones),
          emails: JSON.parse(body.emails),
          addresses: JSON.parse(body.addresses),
          contact: parsedContact,
        };
        const res = await patientService.addPatient(payload);
        const {
          data: { id: patientId },
        } = res;
        const nehrService = new NEHRConnectorApiService({}, ctx);
        await nehrService.submitPatientToNEHR(patientId);
        return responseSuccess(res, 'has been successfully created', 'Patient');
      }

      case 'create-prescription': {
        const res = await prescriptionService.createPrescription(
          parsePayloadFieldsToInteger({ ...restBody, isDraft: Boolean(restBody.isDraft) }) as PrescriptionValues,
        );

        return {
          data: { ...res.data, patientUUID: restBody.patientUUID },
          titleMessage: 'Prescription',
          message: 'has been successfully created',
        };
      }
      default:
        break;
    }
  } catch (error: any) {
    return {
      message: error?.message,
      status: error?.originError?.response?.status,
    };
  }
  return {
    message: '',
    status: '',
    data: null,
  };
};
export default patientManagementPageApiServer;
