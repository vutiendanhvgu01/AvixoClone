import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Navbar from '../navbar';

jest.mock('common/hooks/useIsMobile', () => () => false);
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render Navbar', () => {
    const { getByLabelText } = render(<Navbar />);
    expect(getByLabelText('navbar')).toBeInTheDocument();
  });

  it('render popover when navbar action button was pressed', () => {
    const { getByLabelText } = render(<Navbar />);

    fireEvent.click(getByLabelText('account-button'));
    expect(getByLabelText('account-popover')).toBeInTheDocument();
  });

  it('render popover when hamburger menu is pressed', () => {
    const { getByLabelText } = render(<Navbar />);

    fireEvent.click(getByLabelText('open drawer'));
    expect(getByLabelText('drawer')).toBeInTheDocument();
  });
});
