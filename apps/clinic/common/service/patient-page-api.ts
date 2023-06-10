import AllergyApiService from 'modules/allergy/services';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { parsePayloadFieldsToInteger } from 'share-components';
import { responseSuccess } from 'share-components/src/utils/apiUtils';
import NEHRConnectorApiService from 'modules/nehr-connector/services';

const patientPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, ...restBody } = body;
  const allergyApiService = new AllergyApiService({}, ctx);
  const nehrService = new NEHRConnectorApiService({}, ctx);

  try {
    switch (action) {
      case 'create-allergy': {
        const { nehr, patientId } = restBody;
        try {
          const createAllergy = await allergyApiService.createAllergy(parsePayloadFieldsToInteger(restBody));
          if (nehr) {
            const data = await allergyApiService.getPatientAllergies(patientId);
            if (data.data) {
              nehrService.submitAllergyToNEHR(data.data[data.data.length - 1].id).catch(err => {
                console.error('Error when calling nehr service for allergy creation', err);
              });
            }
            return responseSuccess(createAllergy, `has been successfully added`, `new allergy`);
          }
        } catch (error: any) {
          return {
            message: error?.message,
            status: error?.originError?.response?.status,
          };
        }
        break;
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
export default patientPageApiServer;
