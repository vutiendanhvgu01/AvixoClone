import AppointmentCard from 'modules/appointment/components/appointment-card';
import EmptyComponent from 'modules/cases/components/empty-component';
import { Appointment } from 'modules/appointment/components/appointment-types';
import { Box } from '@mui/material';

interface AppointmentListProps {
  appointments: Appointment[];
  onClickRow: (appointment: Appointment) => void;
}

const AppointmentList = ({ appointments, onClickRow }: AppointmentListProps) => {
  if (!appointments.length) return <EmptyComponent text="There are no Appointments." />;

  return (
    <Box mb={4}>
      {appointments?.map(appointment => (
        <AppointmentCard key={appointment.uuid} appointment={appointment} onClickRow={onClickRow} />
      ))}
    </Box>
  );
};

export default AppointmentList;
