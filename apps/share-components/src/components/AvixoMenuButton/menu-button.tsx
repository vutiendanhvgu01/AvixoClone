import { Box, Button } from '@mui/material';
import * as React from 'react';
import CollapseIcon from '../AvixoIcons/collapsed-icon';
import PlusOutlined from '../AvixoIcons/plus-outlined-icon';
import AvixoMenu from '../AvixoMenu/menu';
import MenuButtonProps from './menu-button-type';

const AvixoMenuButton: React.FC<MenuButtonProps> = ({
  ButtonProps,
  onOpen,
  onClose,
  AvixoMenuBaseProps,
  children,
  label = 'Action',
  customAction,
  dataCy,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onOpen) {
        onOpen();
      }
      setAnchorEl(event.currentTarget);
    },
    [onOpen],
  );

  const handleClose = React.useCallback(() => {
    if (onClose) {
      onClose();
    }
    setAnchorEl(null);
  }, [onClose]);

  return (
    <>
      {customAction ? (
        <Box
          sx={{
            display: 'inline-block',
          }}
          role="presentation"
          onClick={handleClick}
          aria-controls={open ? 'avixo-menu' : undefined}
        >
          {customAction}
        </Box>
      ) : (
        <Button
          startIcon={<PlusOutlined />}
          endIcon={<CollapseIcon />}
          onClick={handleClick}
          data-cy={dataCy}
          aria-controls={open ? 'avixo-menu' : undefined}
          {...ButtonProps}
        >
          {label}
        </Button>
      )}

      <AvixoMenu
        anchorEl={anchorEl}
        open={open}
        handleCloseMenu={handleClose}
        onClose={handleClose}
        onChange={onChange}
        {...AvixoMenuBaseProps}
      >
        {children}
      </AvixoMenu>
    </>
  );
};

export default AvixoMenuButton;
