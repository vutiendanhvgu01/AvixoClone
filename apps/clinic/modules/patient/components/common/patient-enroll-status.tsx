import { Chip, useTheme } from '@mui/material';
import { formatHexToRGBA } from 'share-components/src/utils/formatUtils';

interface PatientEnrollStatusProps {
  status: 'Enrolled' | 'Un-enrolled' | 'Not enrolled';
}

const PatientEnrollStatus: React.FC<PatientEnrollStatusProps> = ({ status }) => {
  const theme = useTheme();

  const statusColor: { [key: string]: string } = {
    Enrolled: theme.palette.info.dark,
    'Un-enrolled': formatHexToRGBA(theme.palette.neutral?.[700], 0.48),
    'Not enrolled': formatHexToRGBA(theme.palette.neutral?.[700], 0.48),
  };

  return <Chip label={`Healthier SG: ${status}`} sx={{ backgroundColor: statusColor[status] }} />;
};

export default PatientEnrollStatus;
