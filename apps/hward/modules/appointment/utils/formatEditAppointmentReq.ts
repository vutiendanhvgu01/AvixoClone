import { FormikValues } from 'formik';
import { Appointment } from 'modules/appointment/components/appointment-types';

export const getFormattedDateTime = (date: string, time: string) => {
  const newDate = new Date(date);
  const newTime = new Date(time);
  newDate.setHours(newTime.getHours(), newTime.getMinutes(), 0, 0);

  return newDate.toISOString();
};

const getFormattedNotes = (values: FormikValues) => {
  const { additionalComments, orderRequest, notes, patientCondition, serviceType } = values;
  if (serviceType === 'Ambulance') return { patientCondition };
  if (serviceType === 'Medication Delivery') return { jarvisNote: notes };

  return {
    patientNote: additionalComments,
    clinicalNote: orderRequest,
  };
};

const getTypeAndSpecialty = (serviceType: string) => {
  if (['Doctor House Call', 'Nurse House Call'].includes(serviceType)) {
    return {
      type: 'Visit',
      specialty: serviceType === 'Doctor House Call' ? 'General Practitioner' : 'Nurse',
    };
  }

  return {
    type: 'Delivery',
    specialty: serviceType === 'Ambulance' ? 'Ambulance' : 'Rider',
  };
};

const formatEditAppointmentReq = (values: FormikValues, service?: Appointment) => {
  const scheduleStart = values?.startTime
    ? getFormattedDateTime(values.startDate, values.startTime)
    : new Date(values.startDate).toISOString();
  const notes = getFormattedNotes(values);

  return {
    country: 'SG',
    id: parseInt(service?.uuid?.replace('S-', '') ?? '0', 10),
    ...getTypeAndSpecialty(values.serviceType),
    scheduleStart,
    ...notes,
  };
};

export default formatEditAppointmentReq;
