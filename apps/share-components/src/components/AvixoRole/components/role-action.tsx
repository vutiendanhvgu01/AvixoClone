import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import AvixoDrawerConfirm from '../../AvixoDrawerComfirm/avixo-drawer-confirm';
import { ROLE_LIST_ACTION } from '../constants';
import type { Role, RoleFormValues } from '../types/role';
import { getRoleSelectedValues } from '../../../utils/pageUtils';

const RoleForm = dynamic(() => import('./role-form'), { ssr: false });

interface RoleActionProps {
  selectedRole?: Role;
  action: string;
  onCancel: () => void;
  toggleAction?: (btnAction: string, role?: RoleFormValues) => void;
}

const RoleAction: React.FC<RoleActionProps> = ({ selectedRole, action, onCancel, toggleAction }) => {
  switch (action) {
    case ROLE_LIST_ACTION.ADD_ROLE:
      return <RoleForm onCancel={onCancel} open />;

    case ROLE_LIST_ACTION.EDIT_ROLE: {
      if (selectedRole) {
        return (
          <RoleForm
            onCancel={onCancel}
            open
            initData={getRoleSelectedValues(selectedRole)}
            toggleAction={toggleAction}
          />
        );
      }
      return null;
    }

    case ROLE_LIST_ACTION.DELETE_ROLE:
      return selectedRole ? (
        <AvixoDrawerConfirm
          open
          title="Delete Role"
          confirmContent={
            <Typography variant="body2">
              Are you sure you want to delete role {selectedRole.name}?
              <br />
              This action cannot be undone.
            </Typography>
          }
          inputProps={{
            label: 'Reason of deletion',
            defaultValues: 'We don’t need this anymore',
            name: 'reason',
            required: true,
          }}
          footerProps={{
            confirmRestProps: {
              variant: 'contained',
            },
          }}
          id={selectedRole?.id}
          action="delete-role"
          handleClose={onCancel}
          moreActions={[
            {
              name: 'name',
              value: selectedRole.name,
            },
          ]}
        />
      ) : null;

    default:
      return null;
  }
};

export default RoleAction;
