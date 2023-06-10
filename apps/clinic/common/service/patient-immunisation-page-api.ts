import { ImmunisationFormValues } from 'modules/immunisation/components/immunisation-types';
import ImmunisationApiService from 'modules/immunisation/services';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { parsePayloadFieldsToInteger } from 'share-components';
import { responseSuccess } from 'share-components/src/utils/apiUtils';

const getSuccessMessage = (isNEHR: boolean) =>
  isNEHR
    ? 'New immunisation has been successfully added %26 New Immunisation has been successfully submitted to NEHR'
    : 'New immunisation has been successfully added';

const patientImmunisationsPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const {
    req: { body },
  } = ctx;
  const { action, ...restBody } = body;
  const immunisationApiService = new ImmunisationApiService({}, ctx);

  const payload = {
    ...(parsePayloadFieldsToInteger(restBody) as ImmunisationFormValues),
    nehr: Boolean(restBody.nehr),
  };

  try {
    switch (action) {
      case 'create-immunisation': {
        delete payload.id;
        await immunisationApiService.createNewPatientImmunisation(payload);
        return {
          message: getSuccessMessage(restBody.nehr),
        };
      }

      case 'update-immunisation': {
        const res = await immunisationApiService.updatePatientImmunisation(payload.id, payload);
        return responseSuccess(res, 'has been successfully updated', 'Immunisation');
      }

      case 'delete-immunisation': {
        const res = await immunisationApiService.deletePatientImmunisation(payload.id);
        return responseSuccess(res, 'has been successfully deleted', 'Immunisation');
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
export default patientImmunisationsPageApiServer;
