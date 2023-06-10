import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { SERVICES } from 'modules/appointment/constants';
import AppointmentForm from '../appointment-form';
import { DEFAULT_APPOINTMENT } from '../appointment-types';

const today = dayjs();

describe('Test AppointmentForm', () => {
  it('submits', async () => {
    const props: Parameters<typeof AppointmentForm>[0] = {
      formTitle: 'Add Appointment',
      onSubmit: jest.fn(),
      open: true,
      initData: {
        service: SERVICES[0],
        numberOfAppointments: '1',
        appointments: [DEFAULT_APPOINTMENT],
      },
    };
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppointmentForm {...props} />
      </LocalizationProvider>,
    );

    expect(screen.getByRole('heading', { name: /add appointment/i })).toBeInTheDocument();

    // Fill in Start Date
    const datepicker = screen.getByLabelText(/start date/i);
    userEvent.type(datepicker, today.toISOString());
    expect(
      screen.getByRole('button', {
        name: /choose date/i,
      }),
    ).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /save/i });
    await act(async () => {
      await userEvent.click(submitBtn);
    });

    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });
});
