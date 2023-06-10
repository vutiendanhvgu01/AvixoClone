import { Box, Button, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import LeftIcon from '../../AvixoIcons/left-icon';
import { ResetPasswordContainer } from './commons';

/**
 *
 *  screen 1
 */

const AuthForgotEmailForm: FC = () => (
  <ResetPasswordContainer>
    <Button
      variant="contained"
      color="neutral"
      sx={{
        paddingX: '8px',
        color: 'neutral.500',
      }}
      startIcon={<LeftIcon />}
    >
      Back
    </Button>
    <Box my={3}>
      <Typography variant="overline" component="h1">
        Forget Password
      </Typography>
      <Typography variant="body2" component="p">
        Please enter the email associated with your account to get a reset link to change your password. The link will
        be sent to the email entered below.
      </Typography>
    </Box>
    <TextField fullWidth label="Email" type="email" />
    <Button fullWidth>Get Reset Link</Button>
  </ResetPasswordContainer>
);
export default AuthForgotEmailForm;
