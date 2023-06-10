import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatientForm from '../patient-form';
import { initialPatientFormData } from '../patient-types';

// Mock getConfig()
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

const VALID_NRIC = 'S0000001I';
const props = {
  initData: initialPatientFormData,
  open: true,
  formTitle: 'Enrol New Patient',
  onSubmit: () => {
    console.log('Submitted');
  },
};

describe('PatientForm', () => {
  it('renders PatientForm', async () => {
    const logMock = jest.spyOn(console, 'log').mockImplementation();

    render(<PatientForm {...props} />);
    expect(screen.getByRole('heading', { name: /enrol new patient/i })).toBeInTheDocument();

    const fullName = screen.getByRole('textbox', { name: 'Full Name' });
    await act(async () => {
      await userEvent.type(fullName, 'User Tester');
    });
    expect(fullName).toHaveValue('User Tester');

    const gender = document.querySelector('#gender') as HTMLElement;
    await act(async () => {
      await userEvent.click(gender);
    });
    await waitFor(() => userEvent.click(screen.getByText(/female/i)));

    const nric = screen.getByRole('textbox', { name: /nric/i });
    await act(async () => {
      await userEvent.type(nric, VALID_NRIC);
    });
    expect(nric).toHaveValue(VALID_NRIC);

    const contact = screen.getByRole('textbox', { name: "Patient/Caregiver's Contact" });
    await act(async () => {
      await userEvent.type(contact, '98123123');
    });

    const submitBtn = screen.getByTestId('submit-btn');
    await act(async () => {
      await userEvent.click(submitBtn);
    });

    expect(logMock).toHaveBeenCalledTimes(1);
  });
});
