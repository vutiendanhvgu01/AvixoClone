import { Box, Button, Typography } from '@mui/material';
import { ROUTES } from 'share-components/src/constants';
import BasicWrapper from 'common/components/basic-wrapper';

const VitalSuccessPage = () => (
  <BasicWrapper>
    <Typography data-testid="successInfo" variant="h5" sx={{ textAlign: 'center', mt: 4 }}>
      Thank you for your submission
    </Typography>
    <Box display="flex" justifyContent="center">
      <Button data-testid="newRecord" href={ROUTES.REPORT_VITAL} variant="outlined" sx={{ my: 4, selfAlign: 'center' }}>
        Submit another
      </Button>
    </Box>
  </BasicWrapper>
);

export default VitalSuccessPage;
