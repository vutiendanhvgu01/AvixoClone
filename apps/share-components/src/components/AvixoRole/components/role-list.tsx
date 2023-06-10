import { Box, Grid, IconButton, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import Edit2Icon from '../../AvixoIcons/edit-2-icon';
import TrashIcon from '../../AvixoIcons/trash-icon';
import AvixoTable from '../../AvixoTable/avixo-table';
import { AvixoTableColumnProps } from '../../AvixoTable/avixo-table-types';
import { ROLE_LIST_ACTION } from '../constants';
import { Role, RoleFormValues } from '../types/role';
import RoleAction from './role-action';

const columns = (onRoleBtnClick: (action: string, role: Role) => void, isEditable: boolean, isDeletable: boolean) =>
  [
    {
      id: 'id',
      field: '',
      label: 'No',
      alignLabel: 'left',
      tableCellBaseProps: {
        width: 100,
      },
      customRender: (_user, i) => i + 1,
    },
    {
      id: 'name',
      field: 'name',
      label: 'Name',
      alignLabel: 'left',
      customRender: role => <Typography variant="subtitle2">{role.name}</Typography>,
    },
    {
      id: 'actions',
      field: '',
      label: 'ACTIONS',
      alignLabel: 'left',
      tableCellBaseProps: {
        width: 200,
      },
      customRender: role => (
        <Grid container spacing={2}>
          {isEditable && (
            <Grid item>
              <IconButton onClick={() => onRoleBtnClick(ROLE_LIST_ACTION.EDIT_ROLE, role)}>
                <Edit2Icon />
              </IconButton>
            </Grid>
          )}
          {isDeletable && (
            <Grid item>
              <IconButton onClick={() => onRoleBtnClick(ROLE_LIST_ACTION.DELETE_ROLE, role)}>
                <TrashIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ),
    },
  ] as AvixoTableColumnProps<Role>[];

export interface RoleListProps {
  roles: Role[];
  emptyText?: string | ReactNode;
  isEditable: boolean;
  isDeletable: boolean;
}

const RoleList: React.FC<RoleListProps> = ({ roles, emptyText, isEditable, isDeletable }) => {
  const [action, setAction] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<Role>();

  const toggleAction = (btnAction: string, role?: RoleFormValues) => {
    setSelectedRole(role as Role);
    setAction(btnAction);
  };

  return (
    <>
      {action && (
        <RoleAction
          action={action}
          selectedRole={selectedRole}
          onCancel={() => toggleAction('')}
          toggleAction={toggleAction}
        />
      )}
      <Box sx={{ mx: -3 }}>
        <AvixoTable
          columns={columns(toggleAction, isEditable, isDeletable)}
          data={{ records: roles || [] }}
          primaryKey="id"
          mode="offline"
          hasCheckBoxHeader={false}
          emptyText={emptyText}
          hasPagination
        />
      </Box>
    </>
  );
};

export default RoleList;
