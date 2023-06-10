import { render } from '@testing-library/react';
import { Appointment } from 'modules/appointment/components/appointment-types';
import AppointmentCard from '../appointment-card';

const sampleAppointment = {
  uuid: 'S-81968',
  date: '2023-04-25T00:50:00.000Z',
  startTime: '08:50',
  endTime: '09:20',
  duration: 30,
  type: 'Medication Delivery',
  specialty: 'Rider',
  providers: [],
  status: 'cancelled',
  orderRequest: '',
  additionalComments: '',
  notes: '',
  patientCondition: '',
  user: {
    name: 'John Doe',
    age: 22,
    gender: 'Male',
    nric: 'S0000001I',
  },
} as Appointment;

describe('AppointmentCard', () => {
  it('should render appointment card', () => {
    const { getByText } = render(<AppointmentCard appointment={sampleAppointment} onClickRow={() => null} />);

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('S-81968')).toBeInTheDocument();
    expect(getByText('Medication Delivery')).toBeInTheDocument();
    expect(getByText('Cancelled')).toBeInTheDocument();
  });
});
