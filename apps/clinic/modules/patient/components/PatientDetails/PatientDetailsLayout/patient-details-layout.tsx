import { Paper, Box, styled } from '@mui/material';
import type { Allergy } from 'modules/allergy/components/allergy-types';
import type { Immunisation } from 'modules/immunisation/components/immunisation-types';
import type { Patient } from 'modules/patient/types/patient';
import { ReactNode } from 'react';
import PatientDetailsTabs from '../patient-details-tabs';
import PatientLayoutHeader from './layout-header';

export interface PatientDetailsLayoutProps {
  patient: Patient;
  activeTab?: number;
  allergies: Allergy[];
  immunisations?: Immunisation[];
  children?: ReactNode;
  withPatientDetailsTabs?: boolean;
  actionButtons?: ReactNode;
}

const HeaderBox = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
}));

const PatientDetailsLayout: React.FC<PatientDetailsLayoutProps> = ({
  patient,
  allergies,
  immunisations = [],
  activeTab = 0,
  withPatientDetailsTabs = true,
  children,
  actionButtons,
}) => (
  <Box>
    <HeaderBox>
      <PatientLayoutHeader patient={patient} allergies={allergies} actionButtons={actionButtons} />
    </HeaderBox>
    {withPatientDetailsTabs ? (
      <Paper sx={{ pb: 4 }}>
        <PatientDetailsTabs
          patientUUID={patient.uuid}
          activeTab={activeTab}
          totalAllergies={allergies.length}
          totalImmunisations={immunisations.length}
        />
        {children}
      </Paper>
    ) : (
      children
    )}
  </Box>
);
export default PatientDetailsLayout;
