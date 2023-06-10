import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

export const FormActionBox = styled(Box)(({ theme }) => ({
  padding: '24px 32px ',
  display: 'flex',
  justifyContent: 'flex-end',
  borderTop: '1px solid #E6E8F0',
  position: 'absolute',
  width: '100%',
  bottom: 0,
  zIndex: 1,
  background: 'white',
  [theme.breakpoints.down('md')]: {
    padding: '16px 24px',
    justifyContent: 'space-between',
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  '&:first-of-type': {
    marginRight: 32,
  },
  '&:only-of-type': {
    marginRight: 0,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const FormActionBoxNotFixed = styled(Box)(({ theme }) => ({
  padding: '24px 32px ',
  display: 'flex',
  justifyContent: 'flex-end',
  borderTop: '1px solid #E6E8F0',

  zIndex: 1,
  background: 'white',
  [theme.breakpoints.down('md')]: {
    padding: '16px 24px',
    justifyContent: 'space-between',
  },
}));
