import AllergyApiService from 'modules/allergy/services';
import DiagnosisApiService from 'modules/diagnosis/services';
import CaseNoteApiService from 'modules/medical-record/services/case-note';
import NEHRConnectorApiService from 'modules/nehr-connector/services';
import { PrescriptionValues } from 'modules/prescription/components/PrescriptionForm/types';
import PrescriptionApiService from 'modules/prescription/service';
import SCMSConnectorApiService from 'modules/scms-connector/services';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { parsePayloadFieldsToInteger } from 'share-components';
import { responseSuccess } from 'share-components/src/utils/apiUtils';
import { formatDate } from 'share-components/src/utils/formatUtils';
import MedicalCertificateApiService from 'modules/medical-record/services/medical-certificate';
import DOMPurify from 'isomorphic-dompurify';
import CarePlanApiService, { formatCarePlanFormData } from 'modules/medical-record/services/care-plan';

const DATEPICKER_INPUT_FORMAT = 'yyyy-M-dd';

const patientMedicalPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, ...restBody } = body;
  const allergyApiService = new AllergyApiService({}, ctx);
  const caseNoteApiService = new CaseNoteApiService({}, ctx);
  const scmsConnectorApiService = new SCMSConnectorApiService({}, ctx);
  const prescriptionService = new PrescriptionApiService({}, ctx);
  const medicalCertApiService = new MedicalCertificateApiService({}, ctx);
  const diagnosisApiService = new DiagnosisApiService({}, ctx);
  const nerhConnectorApiService = new NEHRConnectorApiService({}, ctx);

  try {
    switch (action) {
      case 'create-allergy': {
        const { nehr, patientId } = restBody;
        try {
          const createAllergy = await allergyApiService.createAllergy(parsePayloadFieldsToInteger(restBody));
          const { data } = await allergyApiService.getPatientAllergies(patientId);
          if (nehr && data) {
            nerhConnectorApiService.submitAllergyToNEHR(data[data.length - 1].id).catch(err => {
              // eslint-disable-next-line no-console
              console.error('Error when calling NERH service for allergy creation', err);
            });
          }
          return responseSuccess(createAllergy, `has been successfully added`, `new allergy`);
        } catch (error: any) {
          return error;
        }
      }
      case 'create-medical-note': {
        // Sanitize description field
        const description = DOMPurify.sanitize(restBody.description);
        const createMedicalNote = await caseNoteApiService.create({
          generalNarrative: description,
          chiefComplaint: restBody.visitSymptom,
          patientId: parseInt(restBody.patientId, 10),
          isDraft: body.isDraft === 'on',
        });

        if (Array.isArray(restBody.visitDiagnosis) && restBody.visitDiagnosis.length > 0) {
          await Promise.allSettled(
            restBody.visitDiagnosis.map(async (diagnosisName: string) =>
              diagnosisApiService
                .createDiagnose({
                  patientId: parseInt(restBody.patientId, 10),
                  name: diagnosisName,
                })
                .then(({ data }) => {
                  if (data?.id) {
                    // the api is not ready now.wait the BE
                    return nerhConnectorApiService.sendDiagnosis(data?.id, {});
                  }
                  return undefined;
                }),
            ),
          );
        }
        return responseSuccess(createMedicalNote, 'has been successfully added', 'New medical note');
      }
      case 'delete-medical-note': {
        const res = await caseNoteApiService.delete(restBody.id);
        return responseSuccess(res, 'has been successfully deleted', 'Medical note');
      }
      case 'add-cdlens': {
        const {
          vaccinationStatus: status,
          dateOfOnset: dateOfOnsetBody,
          dateOfNotification: dateOfNotificationBody,
          dateOfDiagnosis: dateOfDiagnosisBody,
          ...restDiagnosis
        } = restBody;
        const vaccinationStatus = status === 'yes';
        const dateOfOnset = formatDate(dateOfOnsetBody, DATEPICKER_INPUT_FORMAT);
        const dateOfNotification = formatDate(dateOfNotificationBody, DATEPICKER_INPUT_FORMAT);
        const dateOfDiagnosis = formatDate(dateOfDiagnosisBody, DATEPICKER_INPUT_FORMAT);

        const addCdlens = await scmsConnectorApiService.createDiagnoses(
          parsePayloadFieldsToInteger({
            vaccinationStatus,
            dateOfOnset,
            dateOfNotification,
            dateOfDiagnosis,
            ...restDiagnosis,
          }),
        );
        return responseSuccess(addCdlens, 'has been successfully reported', 'CLENS');
      }
      case 'create-prescription': {
        const res = await prescriptionService.createPrescription(
          parsePayloadFieldsToInteger({
            ...restBody,
            isDraft: Boolean(restBody.isDraft),
          }) as PrescriptionValues,
        );
        return responseSuccess(
          { ...res, data: { ...res.data, patientUUID: restBody.patientUUID } },
          'has been successfully created',
          'Prescription',
        );
      }
      case 'add-medical-certificate': {
        const newMedicalCert = await medicalCertApiService.addMedicalCertificate(restBody);
        return responseSuccess(newMedicalCert, `has been successfully added`, `new medical-cert`);
      }

      case 'create-care-plan': {
        const carePlanApiService = new CarePlanApiService({}, ctx);
        const data = formatCarePlanFormData({ ...body, confirmation: false });
        const res = await carePlanApiService.createCarePlan(data);
        return responseSuccess(res, `has been successfully created`, `New care plan`);
      }

      default:
        break;
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error, 'error');
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
export default patientMedicalPageApiServer;
