import { getEmailByPatient, getPhoneNumberByPatient, getPreferredFieldOfPatient } from '@AvixoUtils/formatUtils';
import { Appointment, AppointmentFormValues } from '../components/appointment-types';

interface EventsAppointMent {
  [key: string]: any;
  start: string;
  end: string;
}

// eslint-disable-next-line import/prefer-default-export
export const getEventsAppointMent = (appointments: Appointment[]): EventsAppointMent[] => {
  if (!appointments) {
    return [];
  }
  return appointments.map((appointment: Appointment) => ({
    id: appointment.id,
    start: appointment.startTime,
    end: appointment.endTime,
    extendedProps: {
      // mock some date here
      eventType: 'General',
      blackoutType: 'Public Holiday',
      ...appointment,
    },
  }));
};

export const getValueFromFirstElementInArray = (arr: Array<any> | undefined, field: string) => {
  if (arr && arr.length > 0) {
    return arr[0][field];
  }
  return '';
};

export const getAppointmentFormValues = (appointment?: Partial<Appointment>): Partial<AppointmentFormValues> => {
  if (appointment) {
    const { patient } = appointment;
    return {
      ...appointment,
      patientId: patient?.id ?? 0,
      patientName: patient?.fullName ?? '',
      patientEmail: getEmailByPatient(patient ?? null),
      practitionerId: appointment?.practitioner?.id,
      practitionerName: appointment?.practitioner?.name,
      idType: getValueFromFirstElementInArray(patient?.identities, 'idType'),
      idNumber: getValueFromFirstElementInArray(patient?.identities, 'idNumber'),
      patientType: patient ? 'existing' : 'new',
      countryCode: getPreferredFieldOfPatient(patient ?? null, 'phones', 'countryCode'),
      phoneNumber: getPreferredFieldOfPatient(patient ?? null, 'phones', 'number'),
    };
  }
  return {};
};
