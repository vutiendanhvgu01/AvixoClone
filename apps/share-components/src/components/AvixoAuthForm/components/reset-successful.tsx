import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { ResetPasswordContainer } from './commons';
/**
 *  screen 4
 */
const ResetSuccessfulPassportForm: FC = () => (
  <ResetPasswordContainer>
    <Typography variant="h4">Password reset successful!</Typography>
    <Box mb={3} mt={5}>
      <Typography variant="body2" component="p">
        Your password has been changed successfully.
      </Typography>
    </Box>
    <Button fullWidth>Login Now</Button>
  </ResetPasswordContainer>
);
export default ResetSuccessfulPassportForm;
