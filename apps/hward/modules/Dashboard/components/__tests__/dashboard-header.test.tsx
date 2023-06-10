import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import DashboardHeader from '../dashboard-header';

const rightContent = () => (
  <>
    <button type="button">Patients</button>
    <button type="button" data-testid="enroll-patient">
      Enrol New Patient
    </button>
  </>
);

describe('Dashboard Header', () => {
  it('should render Dashboard Header with two button', () => {
    const { getByText } = render(
      <DashboardHeader
        renderLeft={() => (
          <>
            <button type="button">Patients</button>
            <button type="button">Enrol New Patient</button>
          </>
        )}
        renderRight={rightContent}
      />,
    );
    expect(getByText('Patients')).toBeInTheDocument();
    expect(getByText('Enrol New Patient')).toBeInTheDocument();
  });
});
