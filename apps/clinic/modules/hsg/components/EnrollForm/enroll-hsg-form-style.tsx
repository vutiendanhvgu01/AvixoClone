import { Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Form = styled('form')(() => ({
  height: '100%',
}));

export const FormBody = styled(Container)(() => ({
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 100px)',
  overflowY: 'scroll',
}));

export const FormActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '24px 47px 32px 32px',
  bgcolor: 'background.paper',
  borderTop: `1px solid ${theme.palette.divider}`,
  '> button': {
    marginLeft: 16,
  },
}));
