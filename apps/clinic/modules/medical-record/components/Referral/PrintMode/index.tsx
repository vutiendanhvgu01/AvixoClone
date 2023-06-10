import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { REFERRAL_TYPE } from 'modules/medical-record/components/Referral/constants';
import React from 'react';
import AEUCCView from './eaucc-view';
import GPFirstView from './gpfirst-view';
import RoutineView from './routine-view';

interface PrintModeProps {
  referralId?: string;
  type: string;
}

const PrintMode: React.FC<PrintModeProps> = ({ referralId, type = REFERRAL_TYPE.Routine }) => (
  <Box
    sx={{
      background: 'white',
      paddingTop: '100px',
      paddingBottom: '190px',
    }}
  >
    <Container>
      <Box sx={{ display: 'flex', mb: '80px' }}>
        <Typography variant="h5" component="h1">
          Referral Form
        </Typography>
        <Box
          sx={{
            ml: 'auto',
            textAlign: 'right',
          }}
        >
          <Typography variant="caption" component="p">
            Referral ID
          </Typography>
          <Typography variant="body2" component="p">
            {referralId}
          </Typography>
        </Box>
      </Box>
      {type === REFERRAL_TYPE.Routine && <RoutineView />}
      {type === REFERRAL_TYPE.GPFirst && <GPFirstView />}
      {type === REFERRAL_TYPE.AEUCC && <AEUCCView />}
      <Divider />
      <Box
        sx={{
          display: 'flex',
          marginTop: '32px',
        }}
      >
        {type === REFERRAL_TYPE.GPFirst && (
          <Typography component="p" variant="body2">
            This is a digital copy, signature is not required.
          </Typography>
        )}
        <Box ml="auto">
          <Button
            size="medium"
            sx={{
              marginLeft: '20px',
            }}
            // onClick={() => handleOpenConfirmModal()}
          >
            Print Now
          </Button>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default PrintMode;
