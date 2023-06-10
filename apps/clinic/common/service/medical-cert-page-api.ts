import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { parsePayloadFieldsToInteger } from 'share-components';
import MedicalCertificateApiService from 'modules/medical-record/services/medical-certificate';
import { responseSuccess } from 'share-components/src/utils/apiUtils';
import { MEDICAL_RECORD_ACTIONS } from 'modules/medical-record/constants/medical-certificate';

const MedicalCertPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, ...restBody } = body;
  const medicalCertApiService = new MedicalCertificateApiService({}, ctx);

  try {
    switch (action) {
      case MEDICAL_RECORD_ACTIONS.EDIT_MC: {
        const { mcID } = restBody;
        const editMedicalCert = await medicalCertApiService.updateMedicalCertificate(
          mcID.toString(),
          parsePayloadFieldsToInteger(restBody),
        );

        return responseSuccess(editMedicalCert, `has been successfully update`, `update medical-cert`);
      }
      case MEDICAL_RECORD_ACTIONS.DELETE_MC: {
        const { mcID } = restBody;
        const delMedicalCert = await medicalCertApiService.deleteMedicalCertificate(mcID.toString());
        return responseSuccess(delMedicalCert, `has been successfully delete`, `delete medical-cert`);
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

export default MedicalCertPageApiServer;
