import { FormattedPatientData } from 'modules/patient/utils/mapPatientsData';
import { PatientCardProps } from 'share-components/src/components/PatientCard/patient-card-types';
import { PatientCard } from 'share-components';
import { Box, Typography } from '@mui/material';

interface PatientListProps {
  patientsList: FormattedPatientData[];
}
const PatientsList: React.FC<PatientListProps> = ({ patientsList = [] }) => {
  if (!patientsList?.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '300px' }}>
        <Typography variant="subtitle1" color="neutral.400">
          There are no patients found.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {patientsList.map(patient => {
        const props = {
          ...patient,
          nric: patient.censoredNRIC,
        } as PatientCardProps;

        return <PatientCard key={patient.uuid} {...props} />;
      })}
    </>
  );
};

export default PatientsList;
