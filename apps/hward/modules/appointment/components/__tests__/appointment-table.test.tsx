import { render } from '@testing-library/react';
import { Appointment } from 'modules/appointment/components/appointment-types';
import AppointmentList from 'modules/appointment/components/appointment-list';
import AppointmentTable from '../appointment-table';

const sampleAppointment = [
  {
    uuid: 'S-81968',
    date: '2023-04-25T00:50:00.000Z',
    startTime: '08:50',
    endTime: '09:20',
    duration: 30,
    type: 'Delivery',
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
  },
  {
    uuid: 'S-81970',
    date: '2023-04-25T00:50:00.000Z',
    startTime: '08:50',
    endTime: '09:20',
    duration: 30,
    type: 'Visit',
    specialty: 'General Practitioner',
    providers: [],
    status: 'draft',
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
  },
] as Appointment[];

describe('AppointmentTable Web and Mobile view', () => {
  it('should render appointment table', () => {
    const { getByText } = render(
      <AppointmentTable
        appointments={sampleAppointment}
        totalAppointments={sampleAppointment?.length}
        paginationOptions={{ perPage: 10, page: 1 }}
        onPageChange={() => null}
        onPageSizeChange={() => null}
        onClickRow={() => null}
      />,
    );
    // expect(getByText('Doctor House Call')).toBeInTheDocument();
    expect(getByText('S-81968')).toBeInTheDocument();
    expect(getByText('Medication Delivery')).toBeInTheDocument();
    expect(getByText('Cancelled')).toBeInTheDocument();
  });

  it('should render appointment table on mobile', () => {
    const { getByText } = render(<AppointmentList appointments={sampleAppointment} onClickRow={() => null} />);
    expect(getByText('Doctor House Call')).toBeInTheDocument();
    expect(getByText('S-81970')).toBeInTheDocument();
    expect(getByText('Medication Delivery')).toBeInTheDocument();
    expect(getByText('Received')).toBeInTheDocument();
  });
});
