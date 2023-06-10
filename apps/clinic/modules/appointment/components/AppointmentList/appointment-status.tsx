import { Box, Typography } from '@mui/material';
import {
  AppointmentStatusIconCancelled,
  AppointmentStatusIconConfirmed,
  // AppointmentStatusIconRescheduled,
  // AppointmentStatusIconNoShow,
} from './appointment-status-icon';

interface AppointmentStatusProps {
  status: 'planned' | 'confirmed' | 'actualised' | 'cancelled';
}

const AppointmentStatus: React.FC<AppointmentStatusProps> = ({ status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed':
        return <AppointmentStatusIconConfirmed />;
      case 'cancelled':
        return <AppointmentStatusIconCancelled />;
      // case 'No Show':
      //   return <AppointmentStatusIconNoShow />;
      // case 'Rescheduled':
      //   return <AppointmentStatusIconRescheduled />;
      default:
        return <AppointmentStatusIconConfirmed />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {getStatusIcon()}
        <Typography variant="body2" ml="11px">
          {status}
        </Typography>
      </Box>
    </Box>
  );
};

export default AppointmentStatus;
