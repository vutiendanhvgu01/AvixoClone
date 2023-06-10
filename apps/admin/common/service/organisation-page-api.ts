import OrganizationService from 'modules/organisation/services';
import formatOrganisationForm from 'modules/organisation/services/formatForm';
import type { OrganisationFormPostValues } from 'modules/organisation/components/organisation-types';
import PractitionerApiService from 'modules/practitioner/services';
import PremiseApiService from 'modules/premise/services';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { responseSuccess } from 'share-components/src/utils/apiUtils';
import formatPremiseForm from 'modules/premise/services/formatForm';

const organisationPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action } = body;

  if (action) {
    try {
      switch (action) {
        case 'delete-practitioner': {
          const { id } = body;
          if (id) {
            const practitionerApiService = new PractitionerApiService({}, ctx);
            const deleteRes = await practitionerApiService.deletePractitioner(id);
            return responseSuccess(deleteRes);
          }
          break;
        }
        case 'add-organisation': {
          const organizationService = new OrganizationService({}, ctx);
          const formattedBody = formatOrganisationForm(body as OrganisationFormPostValues);
          const result = await organizationService.createOrganisation(formattedBody);
          return responseSuccess(result, 'Success', 'Add New Organisation');
        }
        case 'delete-organisation': {
          const { id, name } = body;
          if (id) {
            const organizationService = new OrganizationService({}, ctx);
            const deleteRes = await organizationService.deleteOrganisation(id);
            return responseSuccess(deleteRes, 'has been deleted.', name ?? 'Organisation');
          }
          break;
        }
        case 'add-practitioner': {
          const practitionerApiService = new PractitionerApiService({}, ctx);
          const formattedBody = JSON.parse(body.body);
          delete formattedBody.body;
          const result = await practitionerApiService.createPractitioner(formattedBody);
          return responseSuccess(result, 'has been successfully added', 'Practitioner');
        }
        case 'update-practitioner': {
          const practitionerApiService = new PractitionerApiService({}, ctx);
          const formattedBody = JSON.parse(body.body);
          delete formattedBody.body;
          const result = await practitionerApiService.updatePractitioner(formattedBody.id, formattedBody);
          return responseSuccess(result, 'has been successfully updated', 'Practitioner');
        }
        case 'add-premise': {
          const premiseService = new PremiseApiService({}, ctx);
          const formattedBody = formatPremiseForm(body);
          const result = await premiseService.createPremise(formattedBody);
          return responseSuccess(result, 'Success', 'Add New Premise');
        }
        case 'delete-premise': {
          const premiseService = new PremiseApiService({}, ctx);
          const { id, name } = body;
          if (id) {
            const result = await premiseService.deletePremise(id);
            return responseSuccess(result, 'has been deleted.', name ?? 'Premise');
          }
          break;
        }
        case 'update-premise': {
          const premiseService = new PremiseApiService({}, ctx);
          const formattedBody = formatPremiseForm(body);
          if (body.premiseID) {
            const result = await premiseService.updatePremise(body.premiseID, formattedBody);
            return responseSuccess(result, 'Success', 'Update Premise');
          }
        }
        // eslint-disable-next-line no-fallthrough
        default:
          return {
            message: '',
            status: '',
            data: null,
          };
      }
    } catch (error: any) {
      return {
        titleMessage: 'Error',
        message: error?.message,
        status: error?.originError?.response?.status,
      };
    }
  }

  return {
    message: '',
    status: '',
    data: null,
  };
};
export default organisationPageApiServer;
