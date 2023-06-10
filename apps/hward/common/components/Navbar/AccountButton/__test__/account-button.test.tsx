import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import AccountButton from '../account-button';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe('AccountButton', () => {
  it('render popover when account button was pressed', () => {
    const { getByLabelText } = render(<AccountButton />);

    fireEvent.click(getByLabelText('account-button'));
    expect(getByLabelText('account-popover')).toBeInTheDocument();
  });
});
