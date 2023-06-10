import { formatDate } from 'share-components/src/utils/formatUtils';
import dayjs from 'dayjs';
import calculateAge from 'modules/patient/utils/calculateAge';
import { AppointmentsResponse, ServiceAppointmentResponse } from 'modules/appointment/api/appointment-api-type';
import orderBy from 'lodash/orderBy';
import { Appointment } from 'modules/appointment/components/appointment-types';

export type MapAppointments = {
  appointments: Appointment[];
  appointmentTotal: number;
  nextPageAvailable: boolean;
};

const transformAppointment = (appointment: ServiceAppointmentResponse): Appointment => {
  const age = appointment?.user ? calculateAge(appointment.user.birthDate) : 0;
  return {
    uuid: `S-${appointment.id}`,
    date: appointment.scheduleStart,
    startTime: formatDate(appointment.scheduleStart, 'HH:mm', true),
    endTime: formatDate(appointment.scheduleEnd, 'HH:mm', true),
    duration: dayjs(appointment.scheduleEnd).diff(appointment.scheduleStart, 'minutes'),
    type: appointment.type,
    specialty: appointment.specialty,
    providers: appointment.status !== 'Draft' ? appointment?.providers ?? [] : [],
    status: appointment.status,
    orderRequest: appointment.clinicalNote ?? '',
    additionalComments: appointment.patientNote ?? '',
    notes: appointment.jarvisNote ?? '',
    patientCondition: appointment?.patientCondition ?? '',
    user: {
      name: appointment?.user?.name ?? '',
      age,
      gender: appointment?.user?.gender === 'M' ? 'Male' : 'Female',
      nric: appointment?.user?.nric ?? '',
    },
  } as Appointment;
};

function mapAppointments(data: AppointmentsResponse): MapAppointments {
  const { drafts = [], services = [], ...restProps } = data;
  const formattedServices = services.map((service: ServiceAppointmentResponse) => transformAppointment(service));
  const formattedDrafts = drafts.map((draft: ServiceAppointmentResponse) => transformAppointment(draft));
  const appointments = orderBy([...formattedServices, ...formattedDrafts], ['date'], ['desc']);
  return {
    ...restProps,
    appointments,
  };
}

export default mapAppointments;
