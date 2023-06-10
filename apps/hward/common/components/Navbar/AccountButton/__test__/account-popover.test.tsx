import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import AccountPopover from '../account-popover';

jest.mock('common/hooks/useIsMobile', () => () => false);
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('Account Popover', () => {
  const user = { name: 'Speedoc User' };
  it('render Popover', () => {
    const { getByText } = render(<AccountPopover onClose={() => null} open anchorEl={null} />);

    expect(getByText('Logout')).toBeInTheDocument();
  });
});
