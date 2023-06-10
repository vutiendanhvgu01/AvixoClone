import AuthApiService from 'modules/auth/service';
import { formatAddPractitioner } from 'modules/practitioner/components/PractitionerForm/formatForm';
import PractitionerApiService from 'modules/practitioner/services';
import { PractitionerFormPostValues } from 'modules/practitioner/types/practitioner-types';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { responseSuccess } from 'share-components/src/utils/apiUtils';

const practitionerPageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action } = body;

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
      case 'add-practitioner': {
        const practitionerApiService = new PractitionerApiService({}, ctx);
        const authService = new AuthApiService({}, ctx);

        const formattedBody = formatAddPractitioner(body as PractitionerFormPostValues);

        const result = await practitionerApiService.createPractitioner(formattedBody);

        if (result?.data?.id && formattedBody?.enrole) {
          await authService.addRoleForCredential(result?.data?.id.toString(), {
            roleId: formattedBody.enrole,
          });
        }

        return responseSuccess(result, 'Success', 'Add New Practitioner');
      }
      case 'update-practitioner': {
        const practitionerApiService = new PractitionerApiService({}, ctx);
        const authService = new AuthApiService({}, ctx);

        const formattedBody = formatAddPractitioner(body as PractitionerFormPostValues);

        const result = await practitionerApiService.updatePractitioner(
          (formattedBody?.id ?? '').toString(),
          formattedBody,
        );

        if (
          formattedBody?.practitionerCredentialId &&
          formattedBody?.enrole &&
          formattedBody.practitionerRoleId !== parseInt(formattedBody?.enrole, 10)
        ) {
          // Remove role if exits
          if (formattedBody?.practitionerRoleId) {
            await authService.removeRoleByCredentialId(formattedBody.practitionerCredentialId.toString(), {
              roleId: formattedBody.practitionerRoleId,
            });
          }
          // Add new role
          await authService.addRoleForCredential(formattedBody.practitionerCredentialId.toString(), {
            roleId: parseInt(formattedBody?.enrole, 10),
          });
        }

        return responseSuccess(result, 'Success', 'Update Practitioner');
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

  return {
    message: '',
    status: '',
    data: null,
  };
};
export default practitionerPageApiServer;
