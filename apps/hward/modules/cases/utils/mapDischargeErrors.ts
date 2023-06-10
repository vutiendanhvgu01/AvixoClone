export type dischargeErrorMessage = 'Not found' | 'Already discharged' | 'Active services';

const mappedDischargeError = (message: dischargeErrorMessage): string =>
  ({
    'Not found': 'Please contact your administrator for assistance.',
    'Already discharged': 'Patient already discharged',
    'Active services': 'Patient has active appointment(s).',
  }[message]);

export default mappedDischargeError;
