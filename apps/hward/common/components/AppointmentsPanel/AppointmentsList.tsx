import { Typography, Box, Chip } from '@mui/material';
import AppointmentDetail from 'modules/appointment/components/appointment-detail';
import mapAppointmentType from 'modules/appointment/utils/mapAppointmentType';
import CustomTooltip from 'share-components/src/components/AvixoImageAnnotate/AnnoatateToolbar/toolTip';
import { formatDate } from 'share-components/src/utils/formatUtils';
import dayjs from 'dayjs';
import { Appointment, type JarvisAppointmentStatus } from 'modules/appointment/components/appointment-types';
import mapAppointmentStatus from 'modules/appointment/utils/mapAppointmentStatus';
import StatusChip from 'common/components/StatusChip/StatusChip';
import useAppointmentDetail from 'modules/appointment/hooks/useAppointmentDetail';

interface ListProps {
  data: Appointment[];
  isPast?: boolean;
  refetchAppointments?: () => void;
}
const PAST_STATUSES: JarvisAppointmentStatus[] = ['completed', 'cancelled', 'discharged'];

const List = ({ data, isPast = false, refetchAppointments = () => null }: ListProps) => {
  const title = isPast ? 'Past' : 'Upcoming';
  const { open, ...appointmentDetailProps } = useAppointmentDetail({ onSubmitSuccess: refetchAppointments });
  return (
    <>
      <Box mb={1}>
        <Typography variant="overline"> {title}</Typography>
      </Box>

      {data.map((appointment: Appointment) => {
        const { uuid, date, startTime, endTime, duration, type, status, specialty } = appointment;
        const mappedStatus = mapAppointmentStatus(status);
        const openDetails = () => open(appointment);
        return (
          <Box
            key={uuid}
            sx={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
              borderBottomColor: '#E6E8F0',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              paddingBottom: '12px',
              marginBottom: '12px',
              cursor: 'pointer',
            }}
            onClick={openDetails}
          >
            <Box
              sx={{
                flex: 1,
                color: 'white',
                padding: '4px 8px',
                borderRadius: 1,
                background: `${isPast ? '#9CA3AF' : 'linear-gradient(229.63deg, #6D60FF 11.1%, #2C7CFF 95.3%)'}`,
                textAlign: 'center',
                mr: 2,
                flexGrow: 0,
                minWidth: 40,
              }}
            >
              <Typography variant="caption" color="white">
                {formatDate(date, 'MMM')}
              </Typography>
              <Typography variant="h6">{new Date(date).getDate()}</Typography>
            </Box>
            <CustomTooltip title="View appointment details" followCursor enterDelay={2000} placement="top">
              <Box
                sx={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }}
                flex={{ sm: 8, md: 12 }}
              >
                <Box>
                  <Typography variant="subtitle1" color="black.main">
                    {mapAppointmentType({ specialty, service: type })}
                  </Typography>
                  {/* TODO : replace once we have doctors from API */}
                  <Typography key={uuid} variant="caption">
                    {uuid}
                  </Typography>
                </Box>
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <Typography variant="subtitle2" color="black.main" mt="2px">{`${startTime} - ${endTime}`}</Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <Typography variant="caption" color="chart.purple5">
                      {duration}min. duration
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CustomTooltip>
            <Box sx={{ ml: '12px', display: 'flex', alignItems: 'center' }} flex={{ sm: 2, md: 2, lg: 3 }}>
              <StatusChip status={mappedStatus} />
            </Box>
          </Box>
        );
      })}
      <AppointmentDetail {...appointmentDetailProps} />
    </>
  );
};

const AppointmentsList = ({ appointments, refetchAppointments }: { appointments: Appointment[]; refetchAppointments: () => void }) => {
  if (!appointments) return null;
  /**
   * Upcoming criteria:
   * 1. Appointment date is after the start of today
   * 2. Status is NOT -> Completed/Cancelled/Discharged
   */

  const upcomingAppointments = appointments.filter(
    appointment =>
      dayjs().startOf('day').isBefore(dayjs(appointment.date)) && !PAST_STATUSES.includes(appointment.status),
  );
  /**
   * Past criteria:
   * 1. Appointment date is after YESTERDAY
   */
  const pastAppointments = appointments.filter(
    appointment =>
      dayjs().startOf('day').isAfter(dayjs(appointment.date)) || PAST_STATUSES.includes(appointment.status),
  );

  return (
    <>
      {upcomingAppointments.length ? (
        <Box>
          <List data={upcomingAppointments} refetchAppointments={refetchAppointments} />
        </Box>
      ) : null}
      {pastAppointments.length ? (
        <Box mt={upcomingAppointments.length ? 6 : 0}>
          <List data={pastAppointments} isPast />
        </Box>
      ) : null}
    </>
  );
};

export default AppointmentsList;
