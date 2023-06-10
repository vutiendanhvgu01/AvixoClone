import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import DashboardLayout from '../dashboard-layout';

jest.mock('common/hooks/useIsMobile', () => () => false);
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('Dashboard layout', () => {
  it('should render Dashboard Layout with children', () => {
    const { getByText, getByLabelText } = render(
      <DashboardLayout>
        <div>
          <p>this is div</p>
        </div>
      </DashboardLayout>,
    );

    expect(getByLabelText('navbar')).toBeInTheDocument();
    expect(getByText('this is div')).toBeInTheDocument();
  });
});
