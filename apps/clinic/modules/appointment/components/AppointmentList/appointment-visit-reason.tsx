import { Box, styled, Typography } from '@mui/material';

export type Reason = 'GENERAL' | 'CT Scan' | 'FU Consult' | 'General X-Ray' | 'Treatment';
interface AppointmentVisitReasonProps {
  reason: Reason;
  note?: string;
}

const Circle = styled(Box)({
  width: 16,
  height: 16,
  borderWidth: 1,
  borderColor: '#E6E8F0',
  borderRadius: '50%',
  borderStyle: 'solid',
  marginRight: '8px',
});

const AppointmentVisitReason: React.FC<AppointmentVisitReasonProps> = ({ reason, note }) => {
  const getBgColor = () => {
    switch (reason) {
      case 'CT Scan':
        return '#9FD5A1';
      case 'FU Consult':
        return '#DA6868';
      case 'GENERAL':
        return '#B35BCA';
      case 'General X-Ray':
        return '#1A405F';
      case 'Treatment':
        return '#AD51F6';
      default:
        return '1A405F';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Circle bgcolor={getBgColor()} />
        <Typography variant="body2">{reason}</Typography>
      </Box>
      {note && <Typography variant="body2" color="neutral.500">{`*${note}`}</Typography>}
    </Box>
  );
};

export default AppointmentVisitReason;
