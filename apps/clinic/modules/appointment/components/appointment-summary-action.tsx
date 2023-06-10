import React, { FC, useState, useCallback } from 'react';
import { AvixoMenuButton, MenuItemData } from 'share-components';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const UpIcon = styled(Box)({
  borderColor: `transparent transparent currentColor transparent`,
  borderStyle: 'solid',
  borderWidth: '0px 4px 6px 4px',
  marginTop: '1px',
});

const DownIcon = styled(Box)({
  borderColor: `currentColor transparent transparent transparent`,
  borderStyle: 'solid',
  borderWidth: '6px 4px 0px 4px',
  marginTop: '1px',
});

const AppointmentAction: FC<{ label?: number; handleClick: React.MouseEventHandler<HTMLElement> }> = ({
  label = 1,
  handleClick,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);
  const menuData: MenuItemData[] = [
    {
      label: 'Today',
      value: '0',
      onClick: handleClick,
    },
    {
      label: 'This Week',
      value: '1',
      onClick: handleClick,
    },
    {
      label: 'This Month',
      value: '2',
      onClick: handleClick,
    },
  ];

  return (
    <AvixoMenuButton
      label={menuData[label]?.label || ''}
      ButtonProps={{
        size: 'small',
        variant: 'outlined',
        startIcon: null,
        endIcon: open ? <DownIcon /> : <UpIcon />,
        sx: { color: 'neutral.900', borderColor: 'divider', padding: '6px 12px' },
      }}
      onOpen={handleOpen}
      onClose={handleOpen}
      AvixoMenuBaseProps={{
        menuData,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        sx: {
          marginLeft: 8,
        },
      }}
    />
  );
};

export default AppointmentAction;
