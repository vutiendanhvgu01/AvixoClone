import ReferralApiService from 'modules/medical-record/services/referral';
import { ReferralFormValues } from 'modules/medical-record/types/referral';
import NEHRConnectorApiService from 'modules/nehr-connector/services';
import SCMSConnectorApiService from 'modules/scms-connector/services';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { parsePayloadFieldsToInteger } from 'share-components';

const patientReferralPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, ...restBody } = body;
  const referralApiService = new ReferralApiService({}, ctx);
  const sCMSConnectorApiService = new SCMSConnectorApiService({}, ctx);
  const nEHRConnectorApiService = new NEHRConnectorApiService({}, ctx);

  try {
    switch (action) {
      case 'create-referral': {
        delete restBody.id;
        let data;

        if (body.hsgInstitutionCode) {
          data = JSON.parse(restBody.body);
          delete data.body;
          data.hsgOutboundEmail = data.hsgOutboundEmail ? '1' : '0';
          data = parsePayloadFieldsToInteger(data) as ReferralFormValues;
        } else {
          data = parsePayloadFieldsToInteger(restBody) as ReferralFormValues;
        }

        const res = await referralApiService.createReferral(data);

        /* HSG Referral */
        if (data.hsgInstitutionCode && res.data.id) {
          await Promise.all([
            sCMSConnectorApiService.submitHSGReferral(res.data.id),
            nEHRConnectorApiService.submitReferralToNEHR(res.data.id),
          ]);
        }

        return {
          message: 'New referral has been successfully created',
          titleMessage: '',
        };
      }

      case 'update-referral': {
        let data;
        if (body.hsgInstitutionCode) {
          data = JSON.parse(restBody.body);
          delete data.body;
          data = parsePayloadFieldsToInteger(data) as ReferralFormValues;
        } else {
          data = parsePayloadFieldsToInteger(restBody) as ReferralFormValues;
        }

        await referralApiService.updateReferral(data);

        /* HSG Referral */
        if (data.hsgInstitutionCode) {
          await Promise.all([
            sCMSConnectorApiService.submitHSGReferral(body.id),
            nEHRConnectorApiService.submitReferralToNEHR(body.id),
          ]);
        }
        return {
          titleMessage: '',
          message: 'Referral has been successfully updated',
        };
      }

      case 'delete-referral': {
        const referralID = restBody.id;
        await referralApiService.deleteReferral(referralID);
        // Submit the referral to HSG and NEHR
        await Promise.allSettled([
          sCMSConnectorApiService.submitHSGReferral(referralID),
          nEHRConnectorApiService.submitReferralToNEHR(referralID),
        ]);
        return {
          titleMessage: '',
          message: 'Referral has been successfully deleted',
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
export default patientReferralPageApiServer;
