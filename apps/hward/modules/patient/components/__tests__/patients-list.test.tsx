import { render } from '@testing-library/react';
import PatientsList from 'modules/patient/components/patients-list';
import { FormattedPatientData } from 'modules/patient/utils/mapPatientsData';

describe('Patients List', () => {
  const patientsList = [
    {
      uuid: '1',
      fullname: 'John Doe',
      censoredNRIC: '*****001I',
      age: 21,
      gender: 'Male',
      enrolmentDate: '20-10-2022',
    },
  ] as FormattedPatientData[];
  it('should show patient information', () => {
    const { getByText } = render(<PatientsList patientsList={patientsList} />);

    expect(getByText('John Doe')).toBeInTheDocument();
  });
});
