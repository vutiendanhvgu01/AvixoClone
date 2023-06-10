import { Paper, Typography, Button, Box } from '@mui/material';
import { ReactNode } from 'react';
import { AvixoListHeader, CopyIcon } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';
import { formatHexToRGBA } from 'share-components/src/utils/formatUtils';
import { styled } from '@mui/material/styles';

interface HealthPlanLayoutProps {
  children?: ReactNode;
  patient: Patient;
}

const CopyButton = styled(Button)(() => ({
  height: 40,
  marginLeft: 'auto',
  backgroundColor: formatHexToRGBA('#FFFFFF', 0.2),
}));

const NewHealthPlanLayout: React.FC<HealthPlanLayoutProps> = ({ patient, children }) => (
  <Box>
    <AvixoListHeader
      subTitle={patient?.fullName ?? ''}
      mainTitleComponent={
        <Typography variant="h4" color="white" sx={{ my: 0.5 }}>
          New Health Plan
        </Typography>
      }
      detailTextComponent={
        <Typography component="span" variant="subtitle1" color="white">
          11 August 2023 at 11:30 PM
        </Typography>
      }
      buttonListComponent={
        <CopyButton size="medium" startIcon={<CopyIcon />}>
          Copy Latest Goals
        </CopyButton>
      }
    />
    <Paper sx={{ py: 1 }}>{children}</Paper>
  </Box>
);

export default NewHealthPlanLayout;
