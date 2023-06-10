import AuthApiService from 'modules/auth/api/auth-api';
import { GetServerSidePropsContext } from 'next';
import { RequestBody } from 'next-runtime';
import { responseSuccess } from 'share-components/src/utils/apiUtils';

const convertSettingsToPermissionObject = (setting: any) =>
  Object.keys(setting).map(key => {
    const permissionObj = setting[key];
    const permissions: string[] = [];
    Object.keys(permissionObj).forEach(permissionKey => {
      if (permissionObj[permissionKey] === 'on') {
        permissions.push(permissionKey);
      }
    });
    return {
      id: setting[key]?.id ?? undefined,
      description: key,
      organisationID: '*',
      premiseID: '*',
      practitionerID: '*',
      resourceID: '*',
      resource: key,
      action: permissions,
    };
  });

const rolePageApiServer = async <T extends Record<string, any>>(
  ctx: RequestBody<T> & Partial<GetServerSidePropsContext>,
): Promise<Record<string, any>> => {
  const { req } = ctx;
  const { body } = req;
  const { action, ...restBody } = body;
  const authService = new AuthApiService(ctx);

  try {
    switch (action) {
      case 'add-role': {
        const { name, setting } = restBody;
        const { data } = await authService.createRole({ name });
        if (data?.id && setting) {
          const permissions = convertSettingsToPermissionObject(setting);
          if (permissions && permissions?.length > 0) {
            const permissionIds = await Promise.all(
              permissions.map(permission => authService.createPermission(permission)),
            ).then(resolveValues => resolveValues.map(({ data: resolveValue }) => resolveValue?.id));
            if (permissionIds && permissionIds?.length > 0) {
              await authService.addPermissionsToRole(data.id, permissionIds);
            }
          }
        }
        return responseSuccess(data, `has been successfully added`, `Role ${name}`);
      }
      case 'edit-role': {
        const { setting, id, name } = restBody;
        const permissions = convertSettingsToPermissionObject(setting);
        if (id) {
          const { data } = await authService.updateRole(id, { name });
          const permissionCreatedIds: any[] = [];
          if (permissions?.length > 0) {
            await Promise.all(
              permissions.map(permission => {
                if (permission?.id) {
                  return authService.updatePermission(permission?.id, permission);
                }
                return authService.createPermission(permission).then(({ data: permissionCreated }) => {
                  permissionCreatedIds.push(permissionCreated.id);
                });
              }),
            );
          }
          if (permissionCreatedIds?.length > 0) {
            await authService.addPermissionsToRole(id, permissionCreatedIds);
          }
          return responseSuccess(data, `has been updated successfully`, `Role ${name}`);
        }

        break;
      }
      case 'delete-role': {
        const { name, id } = restBody;
        if (id) {
          const deleteRole = await authService.deleteRole(id);
          return responseSuccess(
            deleteRole,
            deleteRole?.data?.message ?? `has been deleted successfully`,
            `Role ${name}`,
          );
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
export default rolePageApiServer;
