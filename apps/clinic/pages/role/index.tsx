import { Button } from '@mui/material';
import AvixoRole, { Role } from '@ShareComponents/AvixoRole';
import rolePageApiServer from 'common/service/role-page-api';
import { useClinicContext } from 'contexts/clinic-context';
import AuthApiService from 'modules/auth/api/auth-api';
import { GetServerSideProps } from 'next';
import { handle, redirect } from 'next-runtime';
import { useState } from 'react';
import { AvixoListLayout, AvixoTabs, getAlertMessage, PlusOutlined } from 'share-components';
import { ROUTES } from 'share-components/src/constants';

interface RolesPageProps {
  roles: Role[];
}

const RolesPage: React.FC<RolesPageProps> = ({ roles }) => {
  const { permissions } = useClinicContext();
  const [isShowAddRoleForm, setShowAddRoleForm] = useState<boolean>(false);

  const toggleAddRoleForm = () => {
    setShowAddRoleForm(!isShowAddRoleForm);
  };

  return (
    <AvixoListLayout
      title="Roles"
      actionButtons={
        permissions.includes('ROLE_CREATE') ? (
          <Button onClick={toggleAddRoleForm} startIcon={<PlusOutlined />}>
            New Role
          </Button>
        ) : null
      }
    >
      <AvixoTabs
        tabsData={[
          {
            label: 'All Roles',
            component: (
              <AvixoRole.RoleList
                roles={roles}
                isEditable={permissions.includes('ROLE_UPDATE')}
                isDeletable={permissions.includes('ROLE_DELETE')}
              />
            ),
          },
        ]}
      />
      <AvixoRole.RoleForm open={isShowAddRoleForm} onCancel={toggleAddRoleForm} />
    </AvixoListLayout>
  );
};

export default RolesPage;

export const getServerSideProps: GetServerSideProps = handle({
  async get(ctx) {
    const { message, titleMessage, offset, limit } = ctx.query;
    const authLoginService = new AuthApiService();
    try {
      const pageProps = {} as RolesPageProps;
      const { data: roles } = await authLoginService.getRoles({ offset, limit });
      pageProps.roles = roles;
      return {
        props: {
          ...pageProps,
          ...getAlertMessage(message as string, titleMessage as string),
        },
      };
    } catch {
      return {
        notFound: true,
      };
    }
  },
  async post(ctx) {
    const { message, titleMessage } = await rolePageApiServer(ctx);
    return redirect(`${ROUTES.ROLE}?message=${message}&titleMessage=${titleMessage}`);
  },
});
