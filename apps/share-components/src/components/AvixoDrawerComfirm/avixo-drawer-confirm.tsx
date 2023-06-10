import CloseIcon from '@mui/icons-material/Close';
import { Container, Drawer, IconButton, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import type { FC } from 'react';
import type AvixoDrawerConfirmProps from './avixo-drawer-confirm-types';

const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
}));

const AvixoDrawerConfirm: FC<AvixoDrawerConfirmProps> = props => {
  const {
    open = false,
    handleClose,
    title = '',
    confirmContentTitle,
    confirmContent,
    additionContent,
    onInputChange,
    footerProps = {},
    drawerProps,
    headerComponent,
    action,
    inputProps = {
      label: 'Reason',
      autoFocus: false,
    },
    id,
    moreActions = [],
    disabled = false,
  } = props;
  const { confirmText = 'Yes, delete', cancelText = 'Cancel', onConfirmClick, confirmRestProps } = footerProps;
  const theme = useTheme();
  return (
    <Drawer
      anchor="right"
      open={open}
      {...drawerProps}
      PaperProps={{
        sx: {
          width: 498,
        },
      }}
    >
      <Form method="post">
        <Container sx={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {headerComponent || (
              <Typography sx={{ color: 'black.main' }} variant="h5" component="div">
                {title}
              </Typography>
            )}

            <IconButton sx={{ paddingTop: '4px', color: 'neutral.500' }} aria-label="delete" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Container>
          <Container sx={{ padding: '36px 0 20px 0' }}>
            <Typography color="neutral.900" variant="body2" component="div" sx={{ fontWeight: 700 }}>
              {confirmContentTitle}
            </Typography>
            <Typography color="neutral.900" variant="body2" component="div">
              {confirmContent}
            </Typography>
          </Container>
          <input type="text" hidden value={action} name="action" />
          <input type="text" hidden value={id} name="id" />
          {moreActions.length > 0 &&
            moreActions.map(input => <input key={input.name} value={input.value} name={input.name} hidden />)}
          {inputProps?.name && (
            <TextField
              name={inputProps?.name}
              defaultValue={inputProps?.defaultValues}
              onChange={onInputChange}
              rows={5}
              multiline
              required={inputProps?.required}
              fullWidth
              label={inputProps?.label}
              autoFocus={inputProps?.autoFocus}
            />
          )}
          <Typography color="neutral.900" variant="body2" component="div">
            {additionContent}
          </Typography>
        </Container>
        <Container
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            justifyContent: 'space-between',
            textAlign: 'right',
            padding: '24px 28px 32px 0',
          }}
        >
          <Button sx={{ pr: '28px', mr: 2 }} variant="text" onClick={handleClose}>
            {cancelText}
          </Button>
          <Button
            disabled={disabled}
            type={onConfirmClick ? 'button' : 'submit'}
            onClick={onConfirmClick}
            {...confirmRestProps}
          >
            {confirmText}
          </Button>
        </Container>
      </Form>
    </Drawer>
  );
};

export default AvixoDrawerConfirm;
