import { FC, useCallback } from 'react';
import { MenuItem, Popover } from '@mui/material';
import type OrganizationPopoverProps from './organization-popover-types';
import { AvixoOrganisationProps } from '../avixo-sidebar-types';

const OrganizationPopover: FC<OrganizationPopoverProps> = props => {
  const { anchorEl, onClose, onChange, open, organisations, ...other } = props;

  const handleChange = useCallback(
    (item: AvixoOrganisationProps) => {
      if (onChange) {
        onChange(item);
      }
      onClose?.();
    },
    [onChange],
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 248, color: 'black.main' } }}
      transitionDuration={0}
      {...other}
    >
      {organisations?.map((organization: AvixoOrganisationProps) => (
        <MenuItem key={organization?.uuid} onClick={() => handleChange(organization)}>
          {organization?.name}
        </MenuItem>
      ))}
    </Popover>
  );
};

export default OrganizationPopover;
