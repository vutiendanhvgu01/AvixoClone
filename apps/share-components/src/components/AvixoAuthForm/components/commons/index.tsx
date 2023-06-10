import { Box, FormControl, FormHelperText, styled } from '@mui/material';

export const ResetPasswordContainer = styled(Box)(() => ({
  padding: 32,
  background: 'white',
  borderRadius: 16,
  minHeight: 260,
  maxWidth: 415,
}));

export const FormControlAuth = styled(FormControl)(({ theme }) => ({
  marginBottom: 24,
  [theme.breakpoints.down('sm')]: {
    marginBottom: 22,
  },
  height: 58,
}));

export const TextError = styled(FormHelperText)(() => ({
  marginTop: 1,
}));
