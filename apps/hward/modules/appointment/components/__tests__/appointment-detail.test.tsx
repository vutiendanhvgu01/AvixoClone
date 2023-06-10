import { render, fireEvent } from '@testing-library/react';
import AppointmentDetail from 'modules/appointment/components/appointment-detail';
import { Appointment } from 'modules/appointment/components/appointment-types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

jest.useFakeTimers().setSystemTime(new Date('2023-03-29 10:00:00'));

describe('Appointment Details', () => {
  const close = jest.fn();
  const props = {
    close,
    isOpen: true,
    service: {
      uuid: 'mockedId',
      date: '2023-03-29 10:00:00',
      startTime: '10:00',
      endTime: '10:30',
      doctor: [],
      duration: 30,
      type: 'Visit',
      specialty: 'General Practitioner',
      status: 'draft',
      orderRequest: 'This is order request',
      notes: '',
      additionalComments: 'this is additional Comment',
      patientCondition: '',
    } as unknown as Appointment,
  };

  const AppointmentComponent = (componentProps: any) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppointmentDetail {...componentProps} />
    </LocalizationProvider>
  );

  it('should show appointment details information', () => {
    const { getByText, getByRole } = render(<AppointmentComponent {...props} />);

    expect(getByText('Appointment Details')).toBeInTheDocument();
    expect(getByText('Doctor House Call')).toBeInTheDocument();

    const serviceID = getByRole('textbox', { name: 'Service ID' });
    expect(serviceID).toHaveValue(props.service.uuid);

    const startDate = getByRole('textbox', { name: 'Start Date' });
    expect(startDate).toHaveValue('29/03/2023');

    const startTime = getByRole('textbox', { name: 'Start Time' });
    expect(startTime).toHaveValue('10:00');

    const orderRequest = getByRole('textbox', { name: 'Order Request' });
    expect(orderRequest).toHaveValue('This is order request');

    const notes = getByRole('textbox', { name: 'Additional Comments' });
    expect(notes).toHaveValue('this is additional Comment');
  });

  it('should show the right note for medicine delivery', () => {
    const newProps = {
      ...props,
      service: {
        ...props.service,
        type: 'Delivery',
        specialty: 'Rider',
        orderRequest: '',
        additionalComments: '',
        notes: 'This is medicine delivery notes',
      },
    };
    const { getByText, getByRole } = render(<AppointmentComponent {...newProps} />);

    expect(getByText('Medication Delivery')).toBeInTheDocument();

    const orderRequest = getByRole('textbox', { name: 'Notes' });
    expect(orderRequest).toHaveValue('This is medicine delivery notes');
  });

  it('should show the Patient Condition for Ambulance', () => {
    const newProps = {
      ...props,
      service: {
        ...props.service,
        type: 'Delivery',
        specialty: 'Ambulance',
        orderRequest: '',
        additionalComments: '',
        patientCondition: 'Severe',
      },
    };
    const { getByText, getByRole } = render(<AppointmentComponent {...newProps} />);

    expect(getByText('Ambulance')).toBeInTheDocument();

    const orderRequest = getByRole('textbox', { name: 'Patient Condition' });
    expect(orderRequest).toHaveValue('Severe');
  });

  it('should enable edit', () => {
    const { getByTestId, getByRole } = render(<AppointmentComponent {...props} />);

    fireEvent.click(getByTestId('edit-appointment'));

    const orderRequest = getByRole('textbox', { name: 'Order Request' });
    fireEvent.change(orderRequest, { target: { value: 'This is order request' } });

    const notes = getByRole('textbox', { name: 'Additional Comments' });
    fireEvent.change(notes, { target: { value: 'this is additional Comment' } });

    fireEvent.click(getByTestId('submit-btn'));
    expect(getByTestId('submit-btn')).toBeInTheDocument();
  });
});
