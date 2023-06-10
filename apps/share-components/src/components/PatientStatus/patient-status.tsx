import { Chip, styled } from '@mui/material';
import { PatientStatusProps } from './patient-status-types';

type StatusColorTypes = 'info' | 'success' | 'discharged' | 'error';
const STATUS_COLOR: { [key: string]: StatusColorTypes } = {
  onboarded: 'info',
  active: 'success',
  escalated: 'error',
  discharged: 'discharged',
};

const ChipStatus = styled(Chip)(() => ({
  marginLeft: 'auto',
  '&.MuiChip-colorDefault': {
    color: 'neutral.500',
  },
}));

const PatientStatus = ({ size = 'small', label }: PatientStatusProps) => {
  const color = STATUS_COLOR[label?.toLowerCase()];
  return <ChipStatus size={size} label={label} color={color} />;
};

export default PatientStatus;
