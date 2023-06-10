import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { ResetPasswordContainer } from './commons';
/**
 *  screen 3
 */
const RequestExpiredForm: FC = () => (
  <ResetPasswordContainer>
    <Typography variant="h4">Request expired.</Typography>
    <Box mt={2} mb={4}>
      <Typography variant="body2" component="p">
        We’re sorry, but your request to change your password has expired. Please click on the button below to submit a
        new request to change your password.
      </Typography>
    </Box>
    <Button fullWidth sx={{ pt: '11px', pb: '11px' }}>
      Send reset link
    </Button>
  </ResetPasswordContainer>
);
export default RequestExpiredForm;
