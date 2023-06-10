import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AppointmentActionIcon } from 'share-components';
import DashboardCard from '../dashboard-card';

describe('Dashboard card', () => {
  it('should render Dashboard card', () => {
    const { getByRole } = render(<DashboardCard title="Title" Icon={AppointmentActionIcon} number={3200} />);
    expect(getByRole('heading', { name: /Title/i })).toBeInTheDocument();
  });

  it('should render Dashboard card with subtitle', () => {
    const { getByText } = render(
      <DashboardCard title="Title" subtitle="subtitle" Icon={AppointmentActionIcon} number={3200} />,
    );
    expect(getByText('subtitle')).toBeInTheDocument();
  });
});
