// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import formatEditAppointmentReq from 'modules/appointment/utils/formatEditAppointmentReq';
import { Appointment } from 'modules/appointment/components/appointment-types';

jest.useFakeTimers().setSystemTime(new Date('2023-05-31T10:00:00Z'));

describe('formatEditAppointmentReq', () => {
  const service = {
    uuid: 'S-1234',
    date: '2023-03-29 10:00:00',
    startTime: '10:00',
    endTime: '10:30',
    doctor: [],
    duration: 30,
    type: 'Visit',
    specialty: 'General Practitioner',
    status: 'assigned',
    orderRequest: 'This is order request',
    notes: '',
    additionalComments: 'this is additional Comment',
    patientCondition: '',
  } as unknown as Appointment;

  it('should return formatted data with patient note and clinical note', () => {
    const values = {
      serviceType: 'Doctor House Call',
      startDate: '2023-05-31T10:00:00.000Z',
      startTime: '2023-05-31T10:00:00.000Z',
      additionalComments: 'additionalComments',
      orderRequest: 'orderRequest',
    };

    const result = formatEditAppointmentReq(values, service);
    expect(result).toEqual({
      country: 'SG',
      id: 1234,
      type: 'Visit',
      specialty: 'General Practitioner',
      scheduleStart: '2023-05-31T10:00:00.000Z',
      patientNote: 'additionalComments',
      clinicalNote: 'orderRequest',
    });
  });

  it('should return formatted data with jarvis note', () => {
    const values = {
      serviceType: 'Medication Delivery',
      startDate: '2023-05-31T10:00:00.000Z',
      startTime: '2023-05-31T10:00:00.000Z',
      notes: 'additionalComments',
    };

    const newService = {
      ...service,
      type: 'Delivery',
      specialty: 'Rider',
    } as unknown as Appointment;

    const result = formatEditAppointmentReq(values, newService);
    expect(result).toEqual({
      country: 'SG',
      id: 1234,
      type: 'Delivery',
      specialty: 'Rider',
      scheduleStart: '2023-05-31T10:00:00.000Z',
      jarvisNote: 'additionalComments',
    });
  });

  it('should return formatted data with patient condition', () => {
    const values = {
      serviceType: 'Ambulance',
      startDate: '2023-05-31T10:00:00.000Z',
      startTime: '2023-05-31T10:00:00.000Z',
      patientCondition: 'additionalComments',
    };

    const newService = {
      ...service,
      type: 'Delivery',
      specialty: 'Ambulance',
    } as unknown as Appointment;

    const result = formatEditAppointmentReq(values, newService);
    expect(result).toEqual({
      country: 'SG',
      id: 1234,
      type: 'Delivery',
      specialty: 'Ambulance',
      scheduleStart: '2023-05-31T10:00:00.000Z',
      patientCondition: 'additionalComments',
    });
  });
});
