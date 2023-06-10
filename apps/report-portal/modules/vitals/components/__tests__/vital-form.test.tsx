import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VitalForm from 'modules/vitals/components/vital-form';

describe('Vital Form', () => {
  const submitFn = jest.fn();
  const props = {
    formTitle: 'Hi John',
    onSubmit: submitFn,
  };

  it('should render vital form, fill all fields, and submit successfully', async () => {
    const { getByRole, getByText, getByTestId } = render(<VitalForm {...props} />);

    expect(getByText('Hi John')).toBeInTheDocument();

    const weight = getByRole('spinbutton', { name: 'Weight' });
    await act(async () => {
      await userEvent.type(weight, '82');
    });
    expect(weight).toHaveValue(82);

    const height = getByRole('spinbutton', { name: 'Height' });
    await act(async () => {
      await userEvent.type(height, '182');
    });
    expect(height).toHaveValue(182);

    const bodyTemp = getByRole('spinbutton', { name: 'Body Temp' });
    await act(async () => {
      await userEvent.type(bodyTemp, '37.2');
    });
    expect(bodyTemp).toHaveValue(37.2);

    const pulse = getByRole('spinbutton', { name: 'Pulse' });
    await act(async () => {
      await userEvent.type(pulse, '120');
    });
    expect(pulse).toHaveValue(120);

    const spo2 = getByRole('spinbutton', { name: 'SpO2' });
    await act(async () => {
      await userEvent.type(spo2, '99');
    });
    expect(spo2).toHaveValue(99);

    const bloodPressure = getByRole('textbox', { name: 'Systolic / Diastolic' });
    await act(async () => {
      await userEvent.type(bloodPressure, '120/80');
    });
    expect(bloodPressure).toHaveValue('120/80');

    const submitBtn = getByTestId('submit-btn');
    await act(async () => {
      await userEvent.click(submitBtn);
    });
    expect(submitFn).toHaveBeenCalled();
  });

  it('should show invalid panel that say at least 1 field must be filled', async () => {
    const { getByTestId, getByText } = render(<VitalForm {...props} />);

    const submitBtn = getByTestId('submit-btn');
    await act(async () => {
      await userEvent.click(submitBtn);
    });

    expect(getByText('Need to fill at least 1 field')).toBeInTheDocument();
  });
});
