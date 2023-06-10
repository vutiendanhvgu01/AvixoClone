import * as React from 'react';
import type { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import type AvixoSnackbarProps from './avixo-snackbar-types';

const AvixoSnackbar: FC<AvixoSnackbarProps> = (props: AvixoSnackbarProps) => {
  const {
    showActionButton = false,
    showIconButton = true,
    handleClose,
    handleAction,
    actionText = 'Action',
    sx,
    ...restProps
  } = props;

  const action = (
    <>
      {showActionButton && (
        <Button variant="text" onClick={handleAction} sx={{ color: 'primary.light' }}>
          {actionText}
        </Button>
      )}
      {showIconButton && (
        <IconButton
          sx={{ color: 'primary.contrastText' }}
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );

  return (
    <Snackbar
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={action}
      sx={{
        maxWidth: 420,
        ...sx,
      }}
      {...restProps}
    />
  );
};

export default AvixoSnackbar;
