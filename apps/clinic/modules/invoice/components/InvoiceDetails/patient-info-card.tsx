import { AvixoCard } from 'share-components';
import type { Patient } from 'modules/patient/types/patient';
import { getAge, getPatientIdentity } from 'modules/patient/services';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { toTitleCase } from 'share-components/src/utils/stringUtils';
import { Box, Typography } from '@mui/material';

interface InvoicePatientInfoProps {
  patient: Patient;
}

const PatientInfoCard: React.FC<InvoicePatientInfoProps> = ({ patient }) => {
  const patientInfo = `${toTitleCase(patient.gender)}
  ${patient.birthDate ? `, ${getAge(patient.birthDate)} * ${formatDate(patient.birthDate, 'dd MMM yyyy')}` : ''}`;

  return (
    <AvixoCard title="PATIENT INFORMATION" titleVariant="overline" sx={{ minHeight: 230, py: 2 }} fullHeight>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="primary">
          {patient.fullName}
        </Typography>
        <Typography variant="caption">{patientInfo}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="neutral.900">
          {patient.nationality}
        </Typography>
        <Typography variant="caption">{getPatientIdentity(patient.identities)?.value}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="neutral.900">
          Outstanding Balance:
        </Typography>
        <Typography variant="body2" color="neutral.900">
          $390.55
        </Typography>
      </Box>
    </AvixoCard>
  );
};

export default PatientInfoCard;
