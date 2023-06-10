import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import Logo from 'share-components/assets/logo/logo.svg';
import { ResetPasswordContainer } from './commons';
/**
 *  screen 2
 */
const AvixoResetPassword: FC = () => (
  <ResetPasswordContainer>
    <Box display="flex" justifyContent="space-between" flexDirection="row-reverse">
      <Image src={Logo} alt="logo" style={{ marginRight: 20 }} />
    </Box>
    <Box mb={3} mt={5}>
      <Typography variant="h6" mb={1}>
        Reset your password?
      </Typography>
      <Typography variant="body2" component="p">
        If you initiated a password reset for the account associated with{' '}
        <Typography variant="subtitle2" component="span">
          johndoe@gmail.com
        </Typography>
        , please click on the button below to reset your password. If you didn’t initiate this request, please disregard
        this email.
      </Typography>
    </Box>
    <Button fullWidth>Reset Password</Button>
  </ResetPasswordContainer>
);
export default AvixoResetPassword;
