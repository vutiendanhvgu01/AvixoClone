import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { PATIENT_STATUS_COLOR } from 'modules/patient/constants';
import { toTitleCase } from 'share-components/src/utils/stringUtils';

interface PatientStatusProps {
  status: 'active' | 'inactive';
}

const Status = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const StatusColor = styled(Box)<{ color: string }>(({ theme, color }) => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  backgroundColor: color === 'success' ? theme.palette.success.main : theme.palette.error.main,
  borderRadius: '50%',
  marginRight: 8,
}));

const PatientStatus: React.FC<PatientStatusProps> = ({ status }) => (
  <Status>
    <StatusColor color={PATIENT_STATUS_COLOR[status]} />
    {toTitleCase(status)}
  </Status>
);

export default PatientStatus;
