import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { AvixoListHeader } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';
import HealthPlanActionButtons from './action-buttons';

export interface HealthPlanLayoutProps {
  children?: ReactNode;
  patient: Patient;
  hideActionButtons?: boolean;
}

const HealthPlanLayout: React.FC<HealthPlanLayoutProps> = ({ patient, children, hideActionButtons = false }) => (
  <Box>
    <AvixoListHeader
      subTitle={patient.fullName}
      mainTitleComponent={
        <Typography variant="h4" color="white" sx={{ my: 0.5 }}>
          Health Plan
        </Typography>
      }
      detailTextComponent={
        <Typography component="span" variant="subtitle1" color="white">
          11 August 2023 at 11:30 PM
        </Typography>
      }
      buttonListComponent={!hideActionButtons ? <HealthPlanActionButtons /> : null}
    />
    <Paper sx={{ pb: 1 }}>{children}</Paper>
  </Box>
);

export default HealthPlanLayout;
