import { AppointmentsIcon } from 'share-components';
import ContentPanel from 'common/components/ContentPanel/content-panel';
import { Appointment } from 'modules/appointment/components/appointment-types';
import AppointmentsList from './AppointmentsList';
import EmptyContent from '../EmptyContent/empty-content';

const AppointmentsPanel = ({
  appointments,
  refetchAppointments,
}: {
  appointments: Appointment[] | [];
  refetchAppointments: () => void;
}) => {
  const Body = appointments.length ? (
    <AppointmentsList appointments={appointments} refetchAppointments={refetchAppointments} />
  ) : (
    <EmptyContent text="No Appointments" />
  );
  return (
    <ContentPanel
      title="Appointments"
      Icon={AppointmentsIcon}
      justifyContent="flex-start"
      className="showScrollbar"
      sx={{ overflowY: 'auto' }}
    >
      {Body}
    </ContentPanel>
  );
};

export default AppointmentsPanel;
